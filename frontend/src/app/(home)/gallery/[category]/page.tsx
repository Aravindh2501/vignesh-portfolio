import type { Metadata } from "next";
import { getPhotos, getCategories } from "@/lib/api";
import CategoryGalleryClient from "./category-gallery-client";
import { notFound } from "next/navigation";
import Footer from "@/components/footer";
import VectorCombined from "@/components/vector-combined";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const label = category.charAt(0).toUpperCase() + category.slice(1);
  return {
    title: label,
    description: `${label} photography by Vigneshwaran`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const categories = await getCategories().catch(() => []);
  const cat = categories.find((c) => c.id === category);

  if (!cat) notFound();

  const photos = await getPhotos({ category, limit: 200 }).catch(() => []);
  const label = cat.label;

  const coverImage = photos.length > 0
    ? photos[Math.floor(Math.random() * photos.length)].url
    : "/bg.jpg";

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full">
      {/* LEFT — sticky cover panel */}
      <div className="w-full h-[40vh] lg:w-1/2 lg:fixed lg:top-0 lg:left-0 lg:h-screen p-0 lg:p-3">
        <div
          className="w-full h-full relative bg-center bg-cover rounded-xl"
          style={{ backgroundImage: `url(${coverImage})` }}
        >
          <div className="absolute inset-0 rounded-xl bg-black/20" />
          <div className="absolute bottom-6 left-6 text-white z-10">
            <h1 className="text-4xl font-light">{label}</h1>
            <p className="text-sm opacity-50 mt-1">{photos.length} photos</p>
          </div>
          <div className="absolute right-0 bottom-0">
            <VectorCombined title={label} position="bottom-right" />
          </div>
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2" />

      {/* RIGHT — photo masonry grid */}
      <div className="w-full mt-3 lg:mt-0 lg:w-1/2 space-y-3 pb-3">
        <CategoryGalleryClient photos={photos} categoryLabel={label} />
        <Footer />
      </div>
    </div>
  );
}