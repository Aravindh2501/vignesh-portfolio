"use client";

import { useEffect, useState } from "react";
import Carousel from "@/components/photo-carousel";
import { Skeleton } from "@/components/ui/skeleton";
import type { Photo } from "@/lib/api";
import { getPhotos } from "@/lib/api";
import Image from "next/image";

export const SliderView = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPhotos({ featured: true, limit: 10 })
      .then((data) => {
        // If no featured photos, show latest 10
        if (data.length === 0) return getPhotos({ limit: 10 });
        return data;
      })
      .then(setPhotos)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Skeleton className="w-full h-full rounded-xl" />;
  }

  if (photos.length === 0) {
    return (
      <div className="w-full h-full rounded-xl bg-muted flex items-center justify-center">
        <p className="text-muted-foreground text-sm">No photos yet</p>
      </div>
    );
  }

  return (
    <Carousel
      className="absolute top-0 left-0 w-full h-full rounded-xl"
      containerClassName="h-full"
    >
      {photos.map((photo, index) => (
        <div key={photo._id} className="flex-[0_0_100%] h-full relative">
          <Image
            src={photo.url}
            alt={photo.title || photo.category}
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : undefined}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </Carousel>
  );
};

export const SliderViewSkeleton = () => (
  <Skeleton className="w-full h-full rounded-xl" />
);
