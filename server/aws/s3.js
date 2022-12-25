import aws from "aws-sdk";
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

export const uploadFile = async (file, bufferedFile) => {
  console.log("s3", { file });
  const uploadParams = {
    Bucket: bucketName,
    Body: bufferedFile,
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
