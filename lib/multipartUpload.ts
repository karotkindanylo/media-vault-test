const CHUNK_SIZE = 5 * 1024 * 1024;

export async function multipartUpload(
  file: File,
  onProgress: (p: number) => void
) {
  const { uploadId, key } = await fetch("/api/uploads/multipart/create", {
    method: "POST",
    body: JSON.stringify({ filename: file.name, contentType: file.type }),
  }).then((r) => r.json());

  const totalParts = Math.ceil(file.size / CHUNK_SIZE);
  let uploaded = 0;
  const parts = [];

  for (let i = 0; i < totalParts; i++) {
    const partNumber = i + 1;
    const blob = file.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);

    const { uploadUrl } = await fetch("/api/uploads/multipart/presign-part", {
      method: "POST",
      body: JSON.stringify({ key, uploadId, partNumber }),
    }).then((r) => r.json());

    const etag = await uploadPart(blob, uploadUrl, (bytes) => {
      uploaded += bytes;
      onProgress(Math.round((uploaded / file.size) * 100));
    });

    parts.push({ PartNumber: partNumber, ETag: etag });
  }

  await fetch("/api/uploads/multipart/complete", {
    method: "POST",
    body: JSON.stringify({ key, uploadId, parts }),
  });
}

function uploadPart(
  blob: Blob,
  url: string,
  onBytes: (b: number) => void
): Promise<string> {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    let last = 0;
    xhr.open("PUT", url);

    xhr.upload.onprogress = (e) => {
      onBytes(e.loaded - last);
      last = e.loaded;
    };

    xhr.onload = () =>
      resolve(xhr.getResponseHeader("ETag")!.replace(/"/g, ""));
    xhr.send(blob);
  });
}
