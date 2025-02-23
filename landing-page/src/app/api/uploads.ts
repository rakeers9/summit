// pages/api/uploads.ts
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import { IncomingForm } from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const form = new IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Error parsing form data' });
      }

      // Connect to MongoDB
      const client = await clientPromise;
      const db = client.db('datalabel');

      // Get file data
      if (!files.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      const file = files.file[0];
      const fileData = fs.readFileSync(file.filepath);
      const buffer = Buffer.from(fileData);

      // Create upload record
      const upload = {
        fileName: file.originalFilename,
        fileSize: file.size,
        fileType: file.mimetype,
        reviewsPerImage: fields.reviewsPerImage ? parseInt(fields.reviewsPerImage[0]) : 0,
        targetedDemographic: fields.targetedDemographic ? fields.targetedDemographic[0] : '',
        classificationType: fields.classificationType ? fields.classificationType[0] : '',
        uploadDate: new Date(),
        fileData: buffer,  // Store the actual file in MongoDB
        status: 'uploaded'
      };

      // Insert into MongoDB
      const result = await db.collection('uploads').insertOne(upload);

      // Clean up temp file
      fs.unlinkSync(file.filepath);

      res.status(200).json({ 
        message: 'Upload successful',
        uploadId: result.insertedId 
      });
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Error processing upload' });
  }
}