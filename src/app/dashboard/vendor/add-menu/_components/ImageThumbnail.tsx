import { X } from "lucide-react";

// One selected image preview with its remove button.
type ImageThumbnailProps = {
  previewUrl: string;
  fileName: string;
  onRemove: () => void;
};

export default function ImageThumbnail({
  previewUrl,
  fileName,
  onRemove,
}: ImageThumbnailProps) {
  return (
    <div className="relative">
      {/* Plain img on purpose: preview of a local file, next/image is not needed */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={previewUrl}
        alt={fileName}
        className="h-[84px] w-[84px] rounded-xl border border-border object-cover"
      />

      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${fileName}`}
        className="absolute -top-2 -right-2 flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
