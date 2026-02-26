import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";


export const ExtractPDFText = async (pdfUrl) => {


    const response = await fetch(pdfUrl)
    // console.log("response: ", response);

    const blob = await response.blob()
    // console.log("blob: ", blob);


    const arrayBuffer = await blob.arrayBuffer();
    // console.log("arrayBuffer: ", arrayBuffer);

    const loader = new PDFLoader(new Blob([arrayBuffer]))
    // console.log("loader: ", loader);

    const docs = await loader.load()
    // console.log("docs: ", docs);


    return docs.map((doc) => doc.pageContent).join('\n');

};

