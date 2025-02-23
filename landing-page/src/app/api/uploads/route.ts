import { NextResponse } from 'next/server';
import JSZip from 'jszip';
import { uploadToDrive, createFolder, type UploadFile } from '@/lib/googleDrive';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file = data.get('file') as File;
    const reviewsPerImage = data.get('reviewsPerImage') as string;
    const targetedDemographic = data.get('targetedDemographic') as string;
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
      
      // Create the upload file object
      const uploadFile: UploadFile = {
        name: filename,
        arrayBuffer: fileData,
        mimeType: `image/${fileExtension}`
      };
      
      // Upload to Google Drive
      const uploadedFile = await uploadToDrive(uploadFile, folderId);
      
      console.log('Uploaded image:', filename, 'with ID:', uploadedFile.id);

      images.push({
        filename,
        driveId: uploadedFile.id,
        link: uploadedFile.webViewLink,
        uploadDate: new Date()
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        folderId,
        folderName,
        images,
        reviewsPerImage: parseInt(reviewsPerImage),
        targetedDemographic,
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