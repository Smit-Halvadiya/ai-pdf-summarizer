import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/ApiResponse.js"
// import {ApiError} from "../utils/ApiError.js"


const test = asyncHandler( async(req, res) => {
    return res.json( new ApiResponse(200, "s", "User fetched successfully") )})

export {test}