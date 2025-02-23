import { NextResponse } from 'next/server';
import JSZip from 'jszip';
import { uploadToDrive, createFolder, type UploadFile } from '@/lib/googleDrive';
import dbConnect from '@/lib/dbConnect';
import Image from '@/models/Image';

async function getPrediction(fileData: ArrayBuffer) {
  try {
    // Create form data with the correct file type
    const formData = new FormData();
    formData.append('image_data', new Blob([fileData], { type: 'image/jpeg' }));
    
    console.log('Sending prediction request');

    const response = await fetch('https://harisaiharish--roboflow-predict-predict.modal.run', {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      const errorText = await response.text().catch(() => null);
      throw new Error(`Prediction failed (${response.status}): ${errorText || response.statusText}`);
    }
    
    const result = await response.json();
    
    // Handle both possible response formats from Roboflow
    if (Array.isArray(result)) {
      return {
        success: true,
        predictions: result
      };
    }
    
    return result;
  } catch (error) {
    console.error('Error getting prediction:', error);
    return null;
  }
}

export async function POST(request: Request) {
  try {
    // Connect to MongoDB
    await dbConnect();

    const data = await request.formData();
    const file = data.get('file') as File;
    const classificationType = data.get('classificationType') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Read the zip file
    const zipBuffer = await file.arrayBuffer();
    const zip = await JSZip.loadAsync(zipBuffer);
    
    // Create a folder in Google Drive
    const folderName = file.name.replace('.zip', '');
    console.log('Creating folder:', folderName);
    const folderId = await createFolder(folderName);
    console.log('Created folder with ID:', folderId);
    
    const images: Array<{
      filename: string;
      driveId: string;
      link: string;
      uploadDate: Date;
      mongoId: string;
      prediction?: any;  // Add prediction to the type
    }> = [];

    // Process each file in the zip
    for (const [filename, zipEntry] of Object.entries(zip.files)) {
      // Skip directories and hidden files
      if (zipEntry.dir || filename.startsWith('__MACOSX') || filename.startsWith('.')) {
        continue;
      }

      // Check if file is an image
      const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(filename);
      if (!isImage) continue;

      console.log('Processing image:', filename);

      // Get the file data as ArrayBuffer
      const fileData = await zipEntry.async('arraybuffer');
      const fileExtension = filename.split('.').pop() || '';
      
      // Get AI prediction
      console.log('Getting prediction for:', filename);
      // In your POST route, before calling getPrediction:
      console.log('File data size:', fileData.byteLength);
      console.log('File type:', file.type);
      const prediction = await getPrediction(fileData);
      console.log('Received prediction:', prediction);
      
      // Create the upload file object
      const uploadFile: UploadFile = {
        name: filename,
        arrayBuffer: fileData,
        mimeType: `image/${fileExtension}`
      };
      
      // Upload to Google Drive
      const uploadedFile = await uploadToDrive(uploadFile, folderId);
      console.log('Uploaded image:', filename, 'with ID:', uploadedFile.id);

      // Create MongoDB document for the image
      const imageDoc = await Image.create({
        driveLink: uploadedFile.webViewLink,
        type: classificationType,
        AI_prediction: prediction,  // Add the prediction
        reviews: [],
        totalReviews: 0
      });

      images.push({
        filename,
        driveId: uploadedFile.id,
        link: uploadedFile.webViewLink,
        uploadDate: new Date(),
        mongoId: imageDoc._id.toString(),
        prediction  // Include prediction in response
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        folderId,
        folderName,
        images,
        classificationType
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to process upload' },
      { status: 500 }
    );
  }
}