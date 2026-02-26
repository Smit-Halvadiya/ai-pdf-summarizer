import dotenv from "dotenv";
dotenv.config({
    path: "./.env"
})
import { app } from "./app.js"
import { v2 as cloudinary } from 'cloudinary';
import connectDB from "./db/index.js";




cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


connectDB()
.then(() => {
    app.on("Error", (error) => {
        console.log("Error: ", error);
        throw error;
    })
    app.listen(`${process.env.PORT}`, () => {
        console.log(`server is running at port: ${process.env.PORT}`);
        
    })
})
.catch((error) => {
    console.log("ERROR: ", error);
    
})



