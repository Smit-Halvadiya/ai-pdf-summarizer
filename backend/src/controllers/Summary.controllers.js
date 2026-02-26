
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { PDF } from "../models/pdf_summary.js";



const getAllSummaries = asyncHandler(async (req, res) => {
    console.log("Logged in user:", req.user);

    if (!req.user?._id) {
        throw new ApiError(401, "Unauthorized request");
    }

    const summaries = await PDF
        .find({ owner: req.user._id })
        .sort({ createdAt: -1 });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                summaries,
                "Summaries fetched successfully"
            )
        );
});

const deleteSummary = asyncHandler( async(req, res) => {
    const {summaryId} = req.body
    console.log("backend Summary id is: ", summaryId);
    console.log("backend body id is: ", req.body);
    
    const summary = await PDF.findByIdAndDelete(summaryId)
    if(!summary){
        throw new ApiError(401, "Summary not found")

    }
    // console.log(summaries);
    
    return res.status(200)
    .json(new ApiResponse(200, summary, "summaries deleted sucessfully" ))

    
})

const getSummary = asyncHandler( async(req, res) => {
    console.log(req.params);
    
    const {summaryId} = req.params;
    if(!summaryId){
        throw new ApiError(401, "summary Id not get")
    }

    const summary = await PDF.findById(summaryId)
    if(!summary){
        throw new ApiError(401, "summary not exist")
    }

    return res.status(200)
    .json(new ApiResponse(200, summary, "summary get sucessfully"))    
})

export { getAllSummaries, deleteSummary, getSummary }





