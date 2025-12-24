"use client";

interface UploadDropzoneProps {
  onFiles: (files: File[]) => void;
  disabled?: boolean;
}

export function UploadDropzone({ onFiles, disabled }: UploadDropzoneProps) {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (disabled) return;
    onFiles(Array.from(e.dataTransfer.files));
  };

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-10 text-center transition-colors ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {disabled ? "Uploading..." : "Drop images here"}
    </div>
  );
}
