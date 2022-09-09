import { Router } from "express";
import { upload } from "../config/aws.js";
import { postUploadImage } from "../controllers/upload.js";

const router = Router();

router.post("/image", upload.single("file"), postUploadImage);

export default router;
