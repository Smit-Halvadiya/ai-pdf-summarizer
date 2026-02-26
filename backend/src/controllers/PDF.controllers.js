
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { ExtractPDFText } from "../utils/langChain.js";
import { generateTextToSummaire } from "../utils/geminiAI.js"
import { filenameToTitle } from "../utils/fileNameToTitle.js";
import { PDF } from "../models/pdf_summary.js";


const AddPDFtoUploadThings = asyncHandler(async (req, res) => {


    if (!req.file?.mimetype == "application/pdf") {
        throw new ApiError(401, "upload Only PDF");
    }

    const PDFLocalPath = req.file?.path

    if (!PDFLocalPath) {
        throw new ApiError(401, "PDF not uploaded");

    }

    const cloudinaryPDF = await uploadOnCloudinary(PDFLocalPath)

    if (!cloudinaryPDF) {
        throw new ApiError(401, "Error while uploading PDF on cloudinary");

    }

    const PDFText = await ExtractPDFText(cloudinaryPDF.url)
    if (!PDFText) {
        throw new ApiError(401, "Text not Extracted to PDF")
    }

    const summaryText = await generateTextToSummaire(PDFText)
    if (!summaryText) {
        throw new ApiError(401, "summary not generated")
    }

    // console.log(summari);


    const title = filenameToTitle(req.file.originalname)

    // user_id
    // original_file_url
    // status
    // title 
    // summary_text
    // file_name
    const pdfSummary = await PDF.create({
        // user_id: "1",
        original_file_url: cloudinaryPDF.url,
        status: "completed",
        title,
        summary_text: summaryText,
        file_name: req.file.originalname,
        owner: req.user._id
    })

    const createdPdfSummary = await PDF.findById(pdfSummary._id)

    if (!createdPdfSummary) {
        throw new ApiError(500, "pdf summary not created, please try Again!")
    }


    return res.
        status(200)
        .json(new ApiResponse(201, createdPdfSummary, "PDF uploaded successfully"))

})


// const getAllSummary = asyncHandler( async(req, res) => {
//     // const { page = 2, limit = 10, query, sortBy = 'createdAt', sortType = 'desc', userId } = req.query;
        
   

//     // Parse pagination and sorting
//     // const skip = (page - 1) * limit;
//     // const sortOrder = sortType === 'asc' ? 1 : -1;  // Sorting direction (ascending or descending)

//     // Build the filter query object
//     // let filterQuery = {};

//     // if (query) {
//     //     filterQuery.title = { $regex: query, $options: 'i' };  // Case-insensitive search
//     // }

//     // if (userId) {
//     //     filterQuery.userId = userId;  // Filter by userId if provided
//     // }

//     // Fetch the videos based on filters, pagination, and sorting
//     try {
//         const summaries = await PDF.find(req.user._id)
//             // .skip(skip)
//             // .limit(parseInt(limit))
//             // .sort({ [sortBy]: sortOrder });

//         // Optionally, you can also get the total count of videos (for pagination)
//         // const totalCount = await Video.countDocuments(filterQuery);

//         // Send response with videos and total count for pagination
//         res.status(200).json({
//             success: true,
//             data: summaries,
//             // totalCount,
//             // page,
//             // limit
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Server error, unable to fetch summaries.',
//         });
//     }
// })

export { AddPDFtoUploadThings }





