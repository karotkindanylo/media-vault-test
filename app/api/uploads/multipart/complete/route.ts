import { CompleteMultipartUploadCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { s3, BUCKET } from "@/lib/s3";

export async function POST(req: Request) {
  const { key, uploadId, parts } = await req.json();

  await s3.send(
    new CompleteMultipartUploadCommand({
      Bucket: BUCKET,
      Key: key,
      UploadId: uploadId,
      MultipartUpload: { Parts: parts },
    })
  );

  return NextResponse.json({ success: true });
}
