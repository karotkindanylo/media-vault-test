import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";
import { s3, BUCKET } from "@/lib/s3";
import crypto from "crypto";

export async function POST(req: Request) {
  const { filename, contentType } = await req.json();

  if (!contentType.startsWith("image/")) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  const key = `uploads/${crypto.randomUUID()}-${filename}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

  return NextResponse.json({ uploadUrl, key });
}
