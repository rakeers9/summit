import { google } from 'googleapis';
import { Readable } from 'stream';

export interface UploadFile {
  name: string;
  arrayBuffer: ArrayBuffer;
  mimeType: string;
}

function getAuth() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: 'service_account',
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY!.split(String.raw`\n`).join('\n'),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
      },
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });
    return auth;
  } catch (error) {
    console.error('Auth error:', error);
    throw error;
  }
}

export async function createFolder(folderName: string): Promise<string> {
  try {
    const auth = getAuth();
    const drive = google.drive({ version: 'v3', auth });

    console.log('Creating folder:', folderName);
    console.log('Parent folder:', process.env.GOOGLE_DRIVE_PARENT_FOLDER);

    const folderMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [process.env.GOOGLE_DRIVE_PARENT_FOLDER!],
    };

    const response = await drive.files.create({
      requestBody: folderMetadata,
      fields: 'id',
    });

    if (!response.data.id) {
      throw new Error('Failed to create folder - no ID returned');
    }

    return response.data.id;
  } catch (error) {
    console.error('Error creating folder:', error);
    throw error;
  }
}

export async function uploadToDrive(file: UploadFile, folderId: string) {
  try {
    const auth = getAuth();
    const drive = google.drive({ version: 'v3', auth });

    console.log('Uploading file:', file.name);
    console.log('To folder:', folderId);

    const fileMetadata = {
      name: file.name,
      parents: [folderId],
    };

    const media = {
      mimeType: file.mimeType,
      body: Readable.from(Buffer.from(file.arrayBuffer)),
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, webViewLink',
    });

    if (!response.data.id || !response.data.webViewLink) {
      throw new Error('Failed to upload file - no ID or link returned');
    }

    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    return {
      id: response.data.id,
      webViewLink: response.data.webViewLink,
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}