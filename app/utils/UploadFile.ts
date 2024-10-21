"use server"
import { GoogleAIFileManager } from '@google/generative-ai/server';
if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    throw new Error ('please set gemini key')
}
const fileManager = new GoogleAIFileManager(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const uploadFile = async(from:any, contentType:string)=>{
    let uploadResponse;
    if(contentType === 'application/pdf'){
        uploadResponse = await fileManager.uploadFile(from,{
            mimeType: "application/pdf",
            displayName: "Gemini 1.5 PDF",
        });
    }
    else if (contentType === 'image/jpeg'){
        uploadResponse = await fileManager.uploadFile(`${from}.jpeg`,{
            mimeType: "image/jpeg",
            displayName: "Gemini 1.5 JPEG",
        });
    }
    else if (contentType === 'image/png'){
        uploadResponse = await fileManager.uploadFile(`${from}.png`,{
            mimeType: "image/png",
            displayName: "Gemini 1.5 PNG",
        });
    }

    if (uploadResponse) {
        console.log(`Uploaded file ${uploadResponse.file.displayName} as:${uploadResponse.file.uri}`);
        const getResponse = await fileManager.getFile(uploadResponse.file.name);
        console.log(`Retrieved file ${getResponse.displayName} as ${getResponse.uri}`);
    
        const response = {
                mimeType: uploadResponse.file.mimeType,
                fileUri: uploadResponse.file.uri,
        }
    
        return response;
        
    }
    else{
        console.log('upload response is not work')
    }

}

export default uploadFile;
