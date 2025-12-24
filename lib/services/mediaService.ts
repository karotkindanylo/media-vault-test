import { MediaItem } from "@/types/media";

export const mediaService = {
  async getAll(): Promise<MediaItem[]> {
    const response = await fetch("/api/media");
    if (!response.ok) throw new Error("Failed to fetch media");
    return response.json();
  },

  async getPresignedUrl(filename: string, contentType: string) {
    const response = await fetch("/api/uploads/presign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename, contentType }),
    });
    if (!response.ok) throw new Error("Failed to get presigned URL");
    return response.json();
  },
};
