import aws from 'aws-sdk';
import crypto from 'crypto';
import { promisify } from 'util';
const randomBytes = promisify(crypto.randomBytes);

const region = process.env.AWS_S3_REGION;
const bucketName = process.env.AWS_S3_BUCKET;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

// Setup s3 client
const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
});

// Presigned URL function
export async function grenerateUploadURL(fileName: string) {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex") + "_" + fileName;

  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 120
  })

  const signedUrl = await s3.getSignedUrlPromise("putObject", params);
  return signedUrl;
}
