import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { s3, BUCKET } from "@/lib/s3";

export async function GET() {
  const { Contents } = await s3.send(
    new ListObjectsV2Command({ Bucket: BUCKET, Prefix: "uploads/" })
  );

  return NextResponse.json(
    Contents?.map((o) => ({
      key: o.Key!,
      url: `${process.env.PUBLIC_S3_URL}/${o.Key}`,
      size: o.Size ?? 0,
      contentType: "image",
      lastModified: o.LastModified?.toISOString() ?? "",
    })) ?? []
  );
}
