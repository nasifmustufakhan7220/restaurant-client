"use client";

import { useEffect, useState, useRef, type ChangeEvent } from "react";
import { ImagePlus } from "lucide-react";
import { cn } from "@/lib/utils";
import ImageThumbnail from "./ImageThumbnail";

const MAX_IMAGES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

type SelectedImage = {
  file: File;
  previewUrl: string;
  imageUrl: string;
};

type ImageUploadBoxProps = {
  onImagesChange?: (imageUrls: string[]) => void;
};

export default function ImageUploadBox({
  onImagesChange,
}: ImageUploadBoxProps) {
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const previewUrlsRef = useRef<string[]>([]);

  const isAtLimit = selectedImages.length >= MAX_IMAGES;

  // Clean up preview URLs when the component is removed
  useEffect(() => {
    const urls = previewUrlsRef.current;
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  // Select images
  async function handleFilesSelected(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || []);

    // Reset input
    event.target.value = "";

    if (files.length === 0) {
      setErrorMessage("No files selected.");
      return;
    }

    const newImages = [...selectedImages];
    let error = "";

    for (const file of files) {
      // Check maximum image limit

      if (newImages.length >= MAX_IMAGES) {
        error = `You can select a maximum of ${MAX_IMAGES} images.`;
        break;
      }

      // Check duplicate images
      const alreadyExists = newImages.some(
        (image) =>
          image.file.name === file.name && image.file.size === file.size,
      );

      if (alreadyExists) {
        continue;
      }

      // Check image type
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        error = `${file.name} must be a PNG or JPG image.`;
        continue;
      }

      // Check image size
      if (file.size > MAX_FILE_SIZE) {
        error = `${file.name} must be smaller than 5 MB.`;
        continue;
      }

      const imgbbAPI = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`;

      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(imgbbAPI, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        error = `Failed to upload ${file.name}.`;
        continue;
      }

      const result = await res.json();

      console.log("Image uploaded:", result.data.url);
      const imageUrl = result.data.url;

      // Create image preview
      const previewUrl = URL.createObjectURL(file);
      previewUrlsRef.current.push(previewUrl);

      newImages.push({
        file,
        previewUrl,
        imageUrl,
      });
    }

    setSelectedImages(newImages);
    onImagesChange?.(newImages.map((image) => image.imageUrl));
    setErrorMessage(error);
  }

  // Remove selected image
  function handleRemoveImage(previewUrl: string) {
    // শুধু blob URL revoke করা যায়, তাই এখানে previewUrl দিলাম
    URL.revokeObjectURL(previewUrl);
    previewUrlsRef.current = previewUrlsRef.current.filter(
      (url) => url !== previewUrl,
    );

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
        multiple
        disabled={isAtLimit}
        onChange={handleFilesSelected}
        className="peer sr-only"
      />

      <label
        htmlFor="images"
        className={cn(
          "flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border px-4 py-8 text-center transition-colors",
          "peer-focus-visible:border-primary peer-focus-visible:ring-4 peer-focus-visible:ring-ring/30",
          isAtLimit
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer hover:border-primary hover:bg-accent",
        )}
      >
        <ImagePlus className="size-6 text-text-muted" />

        <span className="mt-2 text-sm font-semibold text-foreground">
          Click to upload images
        </span>

        <span className="mt-1 text-xs text-text-muted">
          {isAtLimit
            ? "Maximum images reached."
            : "PNG or JPG, maximum 5 MB each."}
        </span>
      </label>

      {errorMessage && (
        <p className="mt-2 text-[13px] text-destructive" role="alert">
          {errorMessage}
        </p>
      )}

      {selectedImages.length > 0 && (
        <div className="mt-3">
          <p className="text-xs text-text-muted">
            {selectedImages.length} of {MAX_IMAGES} images selected
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {selectedImages.map((image) => (
              <ImageThumbnail
                key={image.previewUrl}
                previewUrl={image.previewUrl}
                fileName={image.file.name}
                onRemove={() => handleRemoveImage(image.previewUrl)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
