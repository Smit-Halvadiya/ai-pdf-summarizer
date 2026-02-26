import { Router } from "express";
import { AddPDFtoUploadThings} from "../controllers/PDF.controllers.js";
import {upload} from "../middlewares/multer.middlewares.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js"

const router = Router();

router.use(verifyJWT);

router.route("/addPDFtoServer").post(
    upload.single("file"),
    AddPDFtoUploadThings
)
// router.route("/summaries").get(getAllSummary);
// router.route("/upload-file").post(uploadFileonCloudStorage)




export default router;