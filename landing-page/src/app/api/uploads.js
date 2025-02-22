// pages/api/upload.js

import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Disable Next.js's default body parser to handle FormData
export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), 'public', 'uploads');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    const form = formidable({
      uploadDir,
      keepExtensions: true,
      // Optional: use original filename
      filename: (name, ext, part, form) => {
        return part.originalFilename;
      },
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error parsing the file' });
      }
      // The uploaded file info is available in the "files" object.
      res.status(200).json({ fields, files });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}