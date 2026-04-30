import { Suspense } from "react";
import { getCategories } from "@/lib/api";
import ProfileCard from "@/components/profile-card";
import CategoryBrowseCard from "@/components/category-browse-card";
import CategoryCard from "@/components/category-card";
import Footer from "@/components/footer";
import { SliderView, SliderViewSkeleton } from "@/components/slider-view";
import { Skeleton } from "@/components/ui/skeleton";

export default async function HomePage() {
  const categories = await getCategories().catch(() => []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full">
      {/* LEFT — fixed photo slider */}
      <div className="w-full lg:w-1/2 h-[70vh] lg:fixed lg:top-0 lg:left-0 lg:h-screen p-0 lg:p-3 rounded-xl">
        <Suspense fallback={<SliderViewSkeleton />}>
          <SliderView />
        </Suspense>
      </div>

      {/* Spacer */}
      <div className="hidden lg:block lg:w-1/2" />

      {/* RIGHT — scrollable content */}
      <div className="w-full mt-3 lg:mt-0 lg:w-1/2 space-y-3 pb-3">
        <ProfileCard />
        <CategoryBrowseCard />

        {/* Category grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-3">
          {categories.length > 0
            ? categories.map((cat) => (
                <CategoryCard key={cat.id} category={cat} />
              ))
            : Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="w-full aspect-[3/4] rounded-lg" />
              ))}
        </div>

        <Footer />
      </div>
    </div>
  );
}
