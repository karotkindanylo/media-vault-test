export function uploadFile(
  file: File,
  uploadUrl: string,
  onProgress: (p: number) => void
) {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", uploadUrl);
    xhr.setRequestHeader("Content-Type", file.type);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => (xhr.status === 200 ? resolve() : reject());
    xhr.onerror = reject;
    xhr.send(file);
  });
}
