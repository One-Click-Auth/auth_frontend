import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import crypto from 'crypto';
import { promisify } from 'util';
const randomBytes = promisify(crypto.randomBytes);

// ENV Keys
const region = process.env._S3_REGION;
const bucketName = process.env._S3_BUCKET;
const accessKeyId = process.env._ACCESS_KEY_ID;
const secretAccessKey = process.env._SECRET_ACCESS_KEY;

if (!accessKeyId) {
  throw new Error('Missing _ACCESS_KEY_ID variable');
}

if (!secretAccessKey) {
  throw new Error('Missing _SECRET_ACCESS_KEY variable');
}

// Setup s3 client
const client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
});

// Presigned URL function
export async function grenerateUploadURL(fileName: string) {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString('hex') + '_' + fileName;

  const params: PutObjectCommandInput = {
    Bucket: bucketName,
    Key: imageName
  };

  const command = new PutObjectCommand(params);

  try {
    const signedUrl = await getSignedUrl(client, command, { expiresIn: 120 });
    return signedUrl;
  } catch (err) {
    throw new Error('Failed to fetch Signed URL');
  }
}
