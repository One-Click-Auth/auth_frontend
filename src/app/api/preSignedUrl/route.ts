import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextRequest, NextResponse } from 'next/server';
import {PutObjectCommand, PutObjectCommandInput} from "@aws-sdk/client-s3"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.nextUrl);
  const fileName = searchParams.get("fileName");
  // const res = fetch('');
  return NextResponse.json({fileName});
}

// Presigned URL function
async function getPresignedUrl(this:any, fileName: string) {
  const bucketParams: PutObjectCommandInput = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: fileName,
    ContentType: "multipart/form-data",
  };
  const command = new PutObjectCommand(bucketParams);
  const signedUrl = await getSignedUrl(this.s3Client, command, {
    expiresIn: 300,
  });
  return signedUrl;
}