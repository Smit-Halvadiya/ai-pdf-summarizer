import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"









const uploadOnCloudinary = async (localpath) => {
    try {
        if (!localpath) return null;
        const response = await cloudinary.uploader.upload(localpath, {
            resource_type: "raw", // IMPORTANT
            // access_mode: "public"
            
        });



        // remove local file after upload
        try {
            fs.unlinkSync(localpath);
        } catch (unlinkErr) {
            console.error("Failed to delete local file:", unlinkErr.message);
        }

        return response;
    } catch (error) {
        console.error("Cloudinary upload failed:", error.message);

        try {
            fs.unlinkSync(localpath);
        } catch (unlinkErr) {
            console.error("Failed to delete local file after error:", unlinkErr.message);
        }

        return null;
    }
};

export { uploadOnCloudinary }




















