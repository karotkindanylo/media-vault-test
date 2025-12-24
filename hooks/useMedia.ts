import { useEffect, useState, useCallback } from "react";
import { MediaItem } from "@/types/media";
import { mediaService } from "@/lib/services/mediaService";

export function useMedia() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await mediaService.getAll();
      setMedia(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { media, isLoading, error, refresh };
}
