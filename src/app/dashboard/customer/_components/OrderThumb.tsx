import Image from "next/image";
import { Pizza } from "lucide-react";

// Small square picture of the ordered item. Needs: itemName. Optional: imageUrl.

type OrderThumbProps = {
  itemName: string;
  imageUrl?: string;
};

const OrderThumb = ({ itemName, imageUrl }: OrderThumbProps) => {
  return (
    <div className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-section">
      {imageUrl ? (
        <Image src={imageUrl} alt={itemName} fill sizes="48px" className="object-cover" />
      ) : (
        // Shown only when the item has no image
        <div className="flex h-full items-center justify-center text-text-muted">
          <Pizza className="size-5" aria-hidden="true" />
        </div>
      )}
    </div>
  );
};

export default OrderThumb;