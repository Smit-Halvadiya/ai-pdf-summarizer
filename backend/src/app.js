import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { clerkMiddleware } from '@clerk/express'
import { clerkClient } from '@clerk/express'
import cors from "cors";



dotenv.config({
    path: "./.env"
})
const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // अगर cookies या auth bhejna ho
  }))

app.use(clerkMiddleware())




app.use(express.json({limit: "16kb"}))
app.use(cookieParser())
app.use(urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

//router

import AddPDFtoUploadThings from "./routes/PDF.routes.js"
import user from "./routes/user.routes.js"
import summary from "./routes/summary.routes.js"
app.use("/api/v1/pdf", AddPDFtoUploadThings)
app.use("/api/v1/user", user)


app.use("/api/v1/summaries", summary)


export { app }