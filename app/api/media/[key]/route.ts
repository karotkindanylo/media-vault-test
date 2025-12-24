import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { s3, BUCKET } from "@/lib/s3";

export async function DELETE(
  _: Request,
  { params }: { params: { key: string } }
) {
  await s3.send(
    new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: decodeURIComponent(params.key),
    })
  );

  return NextResponse.json({ success: true });
}
