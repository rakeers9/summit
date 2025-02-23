import { google } from 'googleapis';
import { Readable } from 'stream';
import * as unzipper from 'unzipper';

// Initialize Google Drive client
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const drive = google.drive({ version: 'v3', auth });

interface UploadResult {
  id: string;
  link: string;
}

interface ImageLink {
  filename: string;
  driveId: string;
  link: string;
  uploadDate: Date;
}

// Create folder in Google Drive
async function createFolder(folderName: string): Promise<string> {
  const folderMetadata = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder',
  };

  const folder = await drive.files.create({
    requestBody: folderMetadata,
    fields: 'id',
  });

  return folder.data.id!;
}

// Upload individual file to Google Drive
async function uploadFile(
  filename: string, 
  mimeType: string, 
  body: Readable, 
  folderId: string
): Promise<UploadResult> {
  const fileMetadata = {
    name: filename,
    parents: [folderId],
  };

  const media = {
    mimeType,
    body,
  };

  const file = await drive.files.create({
    requestBody: fileMetadata,
    media,
    fields: 'id,webViewLink',
  });

  return {
    id: file.data.id!,
    link: file.data.webViewLink!,
  };
}

// Main function to process zip file
export async function processZipUpload(
  file: Buffer, 
  folderName: string
): Promise<ImageLink[]> {
  // Create a folder in Google Drive
  const folderId = await createFolder(folderName);
  const imageLinks: ImageLink[] = [];

  // Extract zip contents
  const directory = await unzipper.Open.buffer(file);

  // Process each file in the zip
  for (const entry of directory.files) {
    // Skip directories and non-image files
    if (entry.type === 'Directory' || !entry.path.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      continue;
    }

    try {
      // Get file buffer
      const content = await entry.buffer();
      const contentStream = Readable.from(content);

      // Determine mime type from file extension
      const extension = entry.path.split('.').pop()?.toLowerCase() || 'jpeg';
      const mimeType = `image/${extension}`;

      // Upload to Google Drive
      const uploadResult = await uploadFile(
        entry.path,
        mimeType,
        contentStream,
        folderId
      );

      imageLinks.push({
        filename: entry.path,
        driveId: uploadResult.id,
        link: uploadResult.link,
        uploadDate: new Date(),
      });
    } catch (error) {
      console.error(`Error processing file ${entry.path}:`, error);
      // Continue with next file even if one fails
      continue;
    }
  }

  return imageLinks;
}

// Helper to validate zip file
export function isValidZipFile(filename: string): boolean {
  return filename.toLowerCase().endsWith('.zip');
}