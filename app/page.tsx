"use client";

import { UploadDropzone } from "@/components/UploadDropzone";
import { MediaGallery } from "@/components/MediaGallery";
import { useMedia } from "@/hooks/useMedia";
import { useMediaUpload } from "@/hooks/useMediaUpload";

export default function Page() {
  const { media, isLoading, refresh } = useMedia();
  const { upload, isUploading, uploadProgress } = useMediaUpload(refresh);

  return (
    <main className="p-8 space-y-6">
      <UploadDropzone onFiles={upload} disabled={isUploading} />
      {uploadProgress && (
        <div className="text-sm text-gray-600">
          Uploading {uploadProgress.filename}:{" "}
          {Math.round(uploadProgress.progress)}%
        </div>
      )}
      {isLoading ? <div>Loading...</div> : <MediaGallery items={media} />}
    </main>
  );
}
