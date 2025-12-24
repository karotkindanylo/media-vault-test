import { MediaItem } from "@/types/media";

export function MediaGallery({ items }: { items: MediaItem[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((i) => (
        <img key={i.key} src={i.url} className="rounded-lg" />
      ))}
    </div>
  );
}
