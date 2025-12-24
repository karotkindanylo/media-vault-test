import { useState, useCallback } from "react";
import { uploadFile } from "@/lib/upload";
import { multipartUpload } from "@/lib/multipartUpload";
import { mediaService } from "@/lib/services/mediaService";

const LARGE_FILE_THRESHOLD = 10 * 1024 * 1024; // 10MB - beacause can't find larger images for testing

interface UploadProgress {
  filename: string;
  progress: number;
}

export function useMediaUpload(onComplete?: () => void) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(
    null
  );
  const [error, setError] = useState<Error | null>(null);

  const upload = useCallback(
    async (files: File[]) => {
      setIsUploading(true);
      setError(null);

      try {
        for (const file of files) {
          setUploadProgress({ filename: file.name, progress: 0 });

          const onProgress = (progress: number) => {
            setUploadProgress({ filename: file.name, progress });
          };

          if (file.size > LARGE_FILE_THRESHOLD) {
            await multipartUpload(file, onProgress);
          } else {
            const { uploadUrl } = await mediaService.getPresignedUrl(
              file.name,
              file.type
            );
            await uploadFile(file, uploadUrl, onProgress);
          }
        }

        onComplete?.();
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Upload failed"));
      } finally {
        setIsUploading(false);
        setUploadProgress(null);
      }
    },
    [onComplete]
  );

  return { upload, isUploading, uploadProgress, error };
}
