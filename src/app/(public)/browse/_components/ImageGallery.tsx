import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

// বড় একটা ছবি + নিচে ছোট thumbnail (UI-তে প্রথম ছবিটাই বড় দেখায়)
export default function ImageGallery({ images, alt }: ImageGalleryProps) {
  return (
    <div>
      {/* বড় ছবি */}
      <div className="relative w-full h-72 sm:h-96 bg-gray-100 rounded-2xl overflow-hidden shadow-md">
        <Image
          src={images[0]}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {/* ছোট ছবিগুলো */}
      <div className="mt-4 grid grid-cols-4 gap-3">
        {images.map((img, index) => (
          <div
            key={index}
            className={`relative h-20 sm:h-24 rounded-xl overflow-hidden bg-gray-100 cursor-pointer border-2 ${
              index === 0 ? "border-red-600" : "border-transparent"
            }`}
          >
            <Image
              src={img}
              alt={`${alt} ${index + 1}`}
              fill
              sizes="25vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}