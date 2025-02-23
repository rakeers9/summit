import { NextResponse } from 'next/server';
import { processZipUpload, isValidZipFile } from '@/lib/googleDrive';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file = data.get('file') as File;
    const reviewsPerImage = data.get('reviewsPerImage') as string;
    const targetedDemographic = data.get('targetedDemographic') as string;
    const classificationType = data.get('classificationType') as string;

    // Validation checks
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!isValidZipFile(file.name)) {
      return NextResponse.json(
        { error: 'Only ZIP files are allowed' },
        { status: 400 }
      );
    }

    // Size validation (e.g., 100MB limit)
    const MAX_SIZE = 100 * 1024 * 1024; // 100MB in bytes
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 100MB limit' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Process the zip file and get image links
    const imageLinks = await processZipUpload(buffer, file.name);

    // Prepare response data
    const uploadData = {
      folderName: file.name,
      uploadDate: new Date(),
      reviewsPerImage: parseInt(reviewsPerImage) || 3, // Default to 3 if not specified
      targetedDemographic,
      classificationType,
      images: imageLinks,
    };

    // TODO: Add MongoDB storage here
    // Example:
    // await db.collection('uploads').insertOne(uploadData);

    return NextResponse.json({
      message: 'Upload successful',
      data: uploadData,
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed. Please try again.' },
      { status: 500 }
    );
  }
}

// Optional: Add configuration for larger file sizes
export const config = {
  api: {
    bodyParser: false, // Disable the default body parser
    responseLimit: '100mb',
  },
};