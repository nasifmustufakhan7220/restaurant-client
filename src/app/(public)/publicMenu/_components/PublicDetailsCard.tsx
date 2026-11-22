import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Store } from "lucide-react";
import { getPublicItemDetails } from "@/lib/api/home";
import { MenuItem } from "@/lib/types/home";
import MotionFade from "./MotionFade";
import ImageGallery from "./ImageGallery";
import OrderButton from "./OrderButton"; // 🛒 নতুন

interface ItemDetailsPageProps {
  params: Promise<{ id: string }>;
}

const PublicDetailsCard = async ({ params }: ItemDetailsPageProps) => {
  const { id } = await params;

  const res: MenuItem | null = await getPublicItemDetails(id);

  if (!res) notFound();

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-6 lg:pt-36">
      {/* 🎬 Back লিংক */}
      <MotionFade x={-16} duration={0.4}>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to home
        </Link>
      </MotionFade>

      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <MotionFade x={-30}>
          <ImageGallery images={res.images} name={res.itemName as string} />
        </MotionFade>

        <MotionFade x={30} delay={0.1} className="flex flex-col">
          <span className="w-fit rounded-full bg-orange-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-orange-600">
            {res.category}
          </span>

          <h1 className="mt-4 text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            {res.itemName}
          </h1>

          <p className="mt-4 text-3xl font-extrabold text-primary sm:text-4xl">
            ${res.price}
          </p>

          {res.description && (
            <p className="mt-5 leading-relaxed text-neutral-600">
              {res.description}
            </p>
          )}

          {/* 🛒 Order বাটন: দাম ও বিবরণের ঠিক পরে, তথ্য কার্ডের আগে */}
          <OrderButton price={res.price as string} />

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <MotionFade y={20} delay={0.3} duration={0.4}>
              <div className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-primary">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-neutral-500">
                    Location
                  </p>
                  <p className="font-semibold text-neutral-800">{res.location}</p>
                </div>
              </div>
            </MotionFade>

            <MotionFade y={20} delay={0.4} duration={0.4}>
              <div className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-primary">
                  <Store className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-neutral-500">
                    Vendor
                  </p>
                  <p className="font-semibold text-neutral-800">{res.vendorName}</p>
                </div>
              </div>
            </MotionFade>
          </div>
        </MotionFade>
      </div>
    </main>
  );
};

export default PublicDetailsCard;