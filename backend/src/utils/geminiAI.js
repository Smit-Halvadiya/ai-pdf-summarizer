import { SUMMARY_SYSTEM_PRPMPT } from "../constant.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ApiError } from "./ApiError.js";

export const generateTextToSummaire = async (PDFText) => {

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 1500 
    }
   });

  const prompt = {
    contents: [
      {
        role: "user",
        parts: [
          { text: SUMMARY_SYSTEM_PRPMPT },
          {
            text: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${PDFText}`
          }
        ]
      }
    ]
  }
  
  const result = await model.generateContent(prompt);
  const response = await result.response;

  console.log("response:............. ",response);
  

  if(!response.text()){
    throw new ApiError(400, "empty response from Gemini API ")
    
  }

  return response.text()
}



