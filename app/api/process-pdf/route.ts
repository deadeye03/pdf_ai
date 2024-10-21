import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Disable Next.js's default body parsing
  },
};

// Main handler for POST request
export async function POST(req: NextRequest) {
  try {
    // Get the form data and extract the file
    const contentType = req.headers.get('content-type') || '';

    if (!contentType.startsWith('multipart/form-data')) {
      return NextResponse.json({ error: 'Expected form data' }, { status: 400 });
    }

    // Get the raw request body and parse it manually
    const formData = await req.formData();

    // Extract file from form data
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Read file content as ArrayBuffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // Define where to store the uploaded file (server-side)
    const uploadDir = path.join(process.cwd(), 'uploads');
    const filePath = path.join(uploadDir, file.name);

    // Ensure directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // Save file to disk
    await fs.writeFile(filePath, fileBuffer);

    // Return response with file path
    return NextResponse.json({ filePath, message: 'File uploaded successfully!' });
  } catch (error) {
    console.error('Error processing the file:', error);
    return NextResponse.json({ error: 'Error processing file' }, { status: 500 });
  }
}
