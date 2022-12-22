// import S3Client from "aws-sdk";
import aws from "aws-sdk";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new aws.S3({
  bucketName,
  region,
  accessKeyId,
  secretAccessKey,
});

export const uploadFile = async (file) => {
  console.log("s3", file.path);
  console.log("s3 tty", typeof file.path);

  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.originalname,
  };
  return s3
    .upload(uploadParams, function (err, data) {
      if (err) {
        console.log("Error", err);
      }
      if (data) {
        return data;
      }
    })
    .promise();
};

// Create S3 service object

// call S3 to retrieve upload file to specified bucket

// Configure the file stream and obtain the upload parameters
