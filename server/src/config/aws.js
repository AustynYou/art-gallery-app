import dotenv from "dotenv";
dotenv.config();

import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

const accessKeyId = process.env.S3_KEY;
const secretAccessKey = process.env.S3_SECRET;

const s3 = new AWS.S3({ accessKeyId, secretAccessKey });
const bucket = process.env.S3_BUCKET;

const config = {
  s3,
  bucket,
  acl: "public-read",
  metaData: (req, file, cb) => {
    cb(null, { fieldName: file.fieldname });
  },
  key: (req, file, cb) => {
    cb(null, `images/${Date.now().toString()}/${file.originalname}`);
  },
};

export const upload = multer({ storage: multerS3(config) });
