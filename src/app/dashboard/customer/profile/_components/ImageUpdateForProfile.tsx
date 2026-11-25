"use client";

import { useEffect, useState, useRef, type ChangeEvent } from "react";
import { ImagePlus, X } from "lucide-react";
import { cn } from "@/lib/utils";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

type SelectedImage = {
  file?: File;
  previewUrl: string;
  imageUrl: string;
};

type ImageUploadBoxProps = {
  onImageChange?: (imageUrl: string) => void;
  defaultImage?: string;
};

export default function ImageUpdateForProfile({
  onImageChange,
  defaultImage,
}: ImageUploadBoxProps) {
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(
    null,
  );
  const [errorMessage, setErrorMessage] = useState("");

  const previewUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (defaultImage) {
      setSelectedImage({
        previewUrl: defaultImage,
        imageUrl: defaultImage,
      });
    } else {
      setSelectedImage(null);
    }
  }, [defaultImage]);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  async function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    event.target.value = "";

    if (!file) return;

    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      setErrorMessage("Image must be a PNG or JPG file.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage("Image must be smaller than 5 MB.");
      return;
    }

    const imgbbAPI = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(imgbbAPI, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        setErrorMessage("Failed to upload image.");
        return;
      }

      const result = await res.json();

      if (!result.success || !result.data?.url) {
        setErrorMessage("Failed to upload image.");
        return;
      }

      const imageUrl: string = result.data.url;

      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }

      const previewUrl = URL.createObjectURL(file);
      previewUrlRef.current = previewUrl;

      setSelectedImage({ file, previewUrl, imageUrl });

      onImageChange?.(imageUrl);

      setErrorMessage("");
    } catch {
      setErrorMessage("Failed to upload image.");
    }
  }

  function handleRemoveImage() {
    if (selectedImage?.previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(selectedImage.previewUrl);
      previewUrlRef.current = null;
    }

    setSelectedImage(null);

    onImageChange?.("");

    setErrorMessage("");
  }

  return (
    <div className="w-full">
      <input
        type="file"
        id="image"
        name="image"
        accept="image/png, image/jpeg"
        onChange={handleFileSelected}
        className="peer sr-only"
      />

      <label
        htmlFor="image"
        className={cn(
          "flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border px-4 py-8 text-center transition-colors",
          "peer-focus-visible:border-primary peer-focus-visible:ring-4 peer-focus-visible:ring-ring/30",
          "cursor-pointer hover:border-primary hover:bg-accent",
        )}
      >
        <ImagePlus className="size-6 text-text-muted" />

        <span className="mt-2 text-sm font-semibold text-foreground">
          {selectedImage ? "Click to change image" : "Click to upload image"}
        </span>

        <span className="mt-1 text-xs text-text-muted">
          PNG or JPG, maximum 5 MB.
        </span>
      </label>

      {errorMessage && (
        <p className="mt-2 text-[13px] text-destructive" role="alert">
          {errorMessage}
        </p>
      )}

      {selectedImage && (
        <div className="mt-3">
          {/* relative + inline-block: ✕ বাটন এখন ছবির কোণাতেই থাকবে */}
          <div className="relative inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImage.previewUrl}
              alt={selectedImage.file?.name ?? "Existing Image"}
              className="size-24 rounded-2xl border border-gray-200 object-cover"
            />

            <button
              type="button"
              onClick={handleRemoveImage}
              aria-label="Remove image"
              className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-red-500 text-white shadow transition hover:bg-red-600"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}