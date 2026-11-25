"use client";

import { useEffect, useState, useRef, type ChangeEvent } from "react";
import { ImagePlus } from "lucide-react";
import { cn } from "@/lib/utils";
import ImageThumbnail from "@/app/dashboard/vendor/add-menu/_components/ImageThumbnail";


const MAX_FILE_SIZE = 5 * 1024 * 1024;

type SelectedImage = {
  file?: File;
  previewUrl: string;
  imageUrl: string;
};

type ImageUploadBoxProps = {
  // CHANGED: string[] এর বদলে এখন শুধু string
  onImageChange?: (imageUrl: string) => void;
  // CHANGED: string[] এর বদলে এখন শুধু string
  defaultImage?: string;
};

export default function ImageUpdateForProfile({
  onImageChange,
  defaultImage,
}: ImageUploadBoxProps) {
  // CHANGED: array এর বদলে একটা image object অথবা null
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(
    null,
  );
  const [errorMessage, setErrorMessage] = useState("");

  const previewUrlRef = useRef<string | null>(null);

  useEffect(() => {
    // CHANGED: defaultImage এখন একটা string, তাই array এর দরকার নেই
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

      // CHANGED: imageUrl একটা string
      const imageUrl: string = result.data.url;

      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }

      const previewUrl = URL.createObjectURL(file);
      previewUrlRef.current = previewUrl;

      setSelectedImage({ file, previewUrl, imageUrl });

      // CHANGED: parent কে array নয়, শুধু string পাঠানো হচ্ছে
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

    // CHANGED: ছবি না থাকলে খালি string পাঠানো হচ্ছে (আগে খালি array ছিল)
    onImageChange?.("");

    setErrorMessage("");
  }

  return (
    <div>
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
          <ImageThumbnail
            previewUrl={selectedImage.previewUrl}
            fileName={selectedImage.file?.name ?? "Existing Image"}
            onRemove={handleRemoveImage}
          />
        </div>
      )}
    </div>
  );
}