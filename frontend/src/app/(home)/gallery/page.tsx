import type { Metadata } from "next";
import { getCategories, getPhotos } from "@/lib/api";
import CategoryCard from "@/components/category-card";
import Footer from "@/components/footer";
import VectorCombined from "@/components/vector-combined";
import GalleryBg from "@/components/gallery-bg";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse all photography categories by Vigneshwaran",
};

export default async function GalleryPage() {
  const categories = await getCategories().catch(() => []);

  // Fetch a few photos from all categories for the background
  const allPhotos = (
    await Promise.all(
      categories.map((cat) => getPhotos({ category: cat.id, limit: 5 }).catch(() => []))
    )
  ).flat();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full">
      {/* LEFT — rotating background */}
      <div className="w-full h-[70vh] lg:w-1/2 lg:fixed lg:top-0 lg:left-0 lg:h-screen p-0 lg:p-3">
        <GalleryBg photos={allPhotos} />
        <div className="absolute right-0 bottom-0">
          <VectorCombined title="Gallery" position="bottom-right" />
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2" />

      {/* RIGHT — category grid */}
      <div className="w-full mt-3 lg:mt-0 lg:w-1/2 space-y-3 pb-3">
        <div className="px-1 pt-2 pb-1">
          <h1 className="text-2xl font-light">Gallery</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {categories.reduce((sum, c) => sum + c.count, 0)} photos across{" "}
            {categories.length} categories
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>

        <Footer />
      </div>
    </div>
  );
}