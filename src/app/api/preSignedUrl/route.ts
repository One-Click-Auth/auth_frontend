import { grenerateUploadURL } from './s3';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.nextUrl);
  const fileName = searchParams.get("fileName");
  
  if (fileName) {
    const url = await grenerateUploadURL(fileName);
    console.log(url);
    return NextResponse.json({url});
  }
}
