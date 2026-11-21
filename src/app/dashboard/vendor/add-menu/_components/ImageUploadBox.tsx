
"use client";

import { useEffect, useState, useRef, type ChangeEvent } from "react";
import { ImagePlus } from "lucide-react";
import { cn } from "@/lib/utils";
import ImageThumbnail from "./ImageThumbnail";

// ⭐ CHANGED: Maximum image limit এখন 1
const MAX_IMAGES = 1;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const EMPTY_IMAGES: string[] = [];

type SelectedImage = {
  file?: File;
  previewUrl: string;
  imageUrl: string;
};

type ImageUploadBoxProps = {
  onImagesChange?: (imageUrls: string[]) => void;
  defaultImages?: string[];
};

export default function ImageUploadBox({
  onImagesChange,
  defaultImages = EMPTY_IMAGES,
}: ImageUploadBoxProps) {
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const previewUrlsRef = useRef<string[]>([]);

  // ⭐ CHANGED: Existing image থাকলেও নতুন image select করা যাবে

  // Set existing image from database
  useEffect(() => {
    const images = defaultImages.slice(0, MAX_IMAGES).map((url) => ({
      previewUrl: url,
      imageUrl: url,
    }));

    setSelectedImages(images);
  }, [defaultImages]);

  // Clean up preview URLs when the component is removed
  useEffect(() => {
    return () => {
      previewUrlsRef.current.forEach((url) =>
        URL.revokeObjectURL(url),
      );
    };
  }, []);

  // Select image
  async function handleFilesSelected(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    // ⭐ CHANGED: এখন শুধু প্রথম একটি file নেওয়া হচ্ছে
    const file = event.target.files?.[0];

    // Reset input
    event.target.value = "";

    if (!file) return;

    let error = "";

    // ⭐ NEW: Check image type
    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      setErrorMessage("Image must be a PNG or JPG file.");
      return;
    }

    // Check image size
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

      const imageUrl = result.data.url;

      // Create image preview
      const previewUrl = URL.createObjectURL(file);
      previewUrlsRef.current.push(previewUrl);

      // ⭐ CHANGED: Remove previous blob preview before replacing
      previewUrlsRef.current.forEach((url) => {
        if (url !== previewUrl) {
          URL.revokeObjectURL(url);
        }
      });

      previewUrlsRef.current = [previewUrl];

      // ⭐ CHANGED: Only one image will be stored
      const newImages = [
        {
          file,
          previewUrl,
          imageUrl,
        },
      ];

      setSelectedImages(newImages);

      // আগের array structure বজায় রাখা হয়েছে
      onImagesChange?.(newImages.map((image) => image.imageUrl));

      setErrorMessage("");
    } catch {
      error = "Failed to upload image.";
      setErrorMessage(error);
    }
  }

  // Remove selected image
  function handleRemoveImage(previewUrl: string) {
    // ⭐ CHANGED: Only revoke blob URLs
    if (previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);

      previewUrlsRef.current = previewUrlsRef.current.filter(
        (url) => url !== previewUrl,
      );
    }

    const newImages = selectedImages.filter(
      (image) => image.previewUrl !== previewUrl,
    );

    setSelectedImages(newImages);

    onImagesChange?.(newImages.map((image) => image.imageUrl));

    setErrorMessage("");
  }

  return (
    <div>
      <input
        type="file"
        id="images"
        name="images"
        accept="image/png, image/jpeg"
        // ⭐ CHANGED: multiple attribute removed
        onChange={handleFilesSelected}
        className="peer sr-only"
      />

      <label
        htmlFor="images"
        className={cn(
          "flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border px-4 py-8 text-center transition-colors",
          "peer-focus-visible:border-primary peer-focus-visible:ring-4 peer-focus-visible:ring-ring/30",
          "cursor-pointer hover:border-primary hover:bg-accent",
        )}
      >
        <ImagePlus className="size-6 text-text-muted" />

        <span className="mt-2 text-sm font-semibold text-foreground">
          {/* ⭐ CHANGED */}
          {selectedImages.length > 0
            ? "Click to change image"
            : "Click to upload image"}
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

      {selectedImages.length > 0 && (
        <div className="mt-3">
          {/* ⭐ CHANGED: Single image counter */}
          <p className="text-xs text-text-muted">
            1 of {MAX_IMAGES} image selected
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {selectedImages.map((image) => (
              <ImageThumbnail
                key={image.previewUrl}
                previewUrl={image.previewUrl}
                fileName={image.file?.name ?? "Existing Image"}
                onRemove={() => handleRemoveImage(image.previewUrl)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
