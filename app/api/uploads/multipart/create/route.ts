import { CreateMultipartUploadCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { s3, BUCKET } from "@/lib/s3";
import crypto from "crypto";

export async function POST(req: Request) {
  const { filename, contentType } = await req.json();

  const key = `uploads/${crypto.randomUUID()}-${filename}`;

  const { UploadId } = await s3.send(
    new CreateMultipartUploadCommand({
      Bucket: BUCKET,
      Key: key,
      ContentType: contentType,
    })
  );

  return NextResponse.json({ uploadId: UploadId, key });
}
