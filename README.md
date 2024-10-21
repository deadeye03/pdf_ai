# PDF Summarizer with Next.js and Gemini AI

This is a Next.js-based web application that allows users to upload a PDF and receive a summarized version of the content using the Gemini AI API.

## Features

- **PDF Upload**: Users can upload a PDF file through the interface.
- **AI Summarization**: Once a PDF is uploaded, the application uses the Gemini AI API to extract and summarize the text.
- **Client-side Rendering**: The application processes the PDF on the client side using `pdfjs-dist`.
- **Next.js**: Built using Next.js, a modern React-based framework.

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **Gemini AI API**: Used for summarizing the PDF content.
- **pdfjs-dist**: For extracting text content from the PDF on the client side.
- **JavaScript**: Core language for the application logic.
- **HTML5 & CSS3**: For structuring and styling the UI.

## Installation

To get started with this project locally, follow these steps:

### Prerequisites

- Node.js version 16 or later
- npm or yarn package manager

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/pdf-summarizer.git
   cd pdf-summarizer

Set up Environment Variables

You need to set up your environment variables for the Gemini AI API. Create a .env.local file in the root directory and add the following:

bash
Copy code
NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key-here

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
