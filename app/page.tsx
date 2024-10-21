"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import uploadFile from './utils/UploadFile'
import model from './utils/gemini'
import Markdown from 'react-markdown'

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [summary, setSummary] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true)
    setSummary('Thinking.....')
    if (!file) {
      alert('No file selected!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/process-pdf', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    console.log("result is", result.filePath);
    const res = await uploadFile(result.filePath, 'application/pdf')
    console.log('able to response', res)
    if (res) {
      const ans = await model.generateContentStream([
        {
          fileData: {
            mimeType: res.mimeType,
            fileUri: res.fileUri,
          },
        },
        { text: "Can you summarize this document as a bulleted list?" },
      ]);

      // Output the generated text to the screen
      
      setSummary('')
      let accumulatedText = "";
      for await (const chunk of ans.stream) {
        const chunkText = chunk.text();
        accumulatedText += chunkText;
        setSummary(accumulatedText);
      }
      setIsLoading(false);

    }
    else{
      setSummary('OOPS SOMETHING WENT WRONG ..... PLEASE TRY AFTER SOME TIME')
    }
  };


  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Gemini PDF Processor</CardTitle>
          <CardDescription>Upload a PDF to process with Gemini AI</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input type="file" accept=".pdf" onChange={onFileChange} />
            <Button type="submit" disabled={!file || isLoading}>
              {isLoading ? 'Processing...' : 'Process PDF'}
            </Button>
          </form>
          {summary && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Summary:</h3>
              <p className="whitespace-pre-wrap"><Markdown>{summary}</Markdown> </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
