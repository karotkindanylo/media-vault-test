import { UploadPartCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";
import { s3, BUCKET } from "@/lib/s3";

export async function POST(req: Request) {
  const { key, uploadId, partNumber } = await req.json();

  const command = new UploadPartCommand({
    Bucket: BUCKET,
    Key: key,
    UploadId: uploadId,
    PartNumber: partNumber,
  });

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

  return NextResponse.json({ uploadUrl });
}
