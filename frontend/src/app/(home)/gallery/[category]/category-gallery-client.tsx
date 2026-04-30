"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Photo } from "@/lib/api";

interface Props {
  photos: Photo[];
  categoryLabel: string;
}

export default function CategoryGalleryClient({ photos, categoryLabel }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null));
  const next = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % photos.length : null));

  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
        <p className="text-sm">No photos in {categoryLabel} yet.</p>
      </div>
    );
  }

  // Split into 2 columns for masonry effect
  const leftCol: Photo[] = [];
  const rightCol: Photo[] = [];
  photos.forEach((p, i) => (i % 2 === 0 ? leftCol : rightCol).push(p));

  const getOriginalIndex = (colIndex: number, col: "left" | "right") =>
    col === "left" ? colIndex * 2 : colIndex * 2 + 1;

  return (
    <>
      {/* Masonry Grid */}
      <div className="grid grid-cols-2 gap-2 px-0">
        <div className="flex flex-col gap-2">
          {leftCol.map((photo, colIndex) => (
            <button
              key={photo._id}
              onClick={() => openLightbox(getOriginalIndex(colIndex, "left"))}
              className="relative overflow-hidden rounded-lg group cursor-pointer w-full"
              style={{
                aspectRatio:
                  photo.width && photo.height
                    ? `${photo.width} / ${photo.height}`
                    : "3 / 4",
              }}
            >
              <Image
                src={photo.url}
                alt={photo.title || categoryLabel}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 1023px) 50vw, 25vw"
              />
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2 mt-8">
          {rightCol.map((photo, colIndex) => (
            <button
              key={photo._id}
              onClick={() => openLightbox(getOriginalIndex(colIndex, "right"))}
              className="relative overflow-hidden rounded-lg group cursor-pointer w-full"
              style={{
                aspectRatio:
                  photo.width && photo.height
                    ? `${photo.width} / ${photo.height}`
                    : "3 / 4",
              }}
            >
              <Image
                src={photo.url}
                alt={photo.title || categoryLabel}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 1023px) 50vw, 25vw"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 z-10"
            onClick={closeLightbox}
          >
            <X size={24} />
          </button>

          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm z-10">
            {lightboxIndex + 1} / {photos.length}
          </div>

          <button
            className="absolute left-4 text-white/70 hover:text-white p-2 z-10"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft size={32} />
          </button>

          <div
            className="relative max-w-[90vw] max-h-[90vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[lightboxIndex].url}
              alt={photos[lightboxIndex].title || categoryLabel}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          <button
            className="absolute right-4 text-white/70 hover:text-white p-2 z-10"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <ChevronRight size={32} />
          </button>

          {photos[lightboxIndex].title && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm z-10">
              {photos[lightboxIndex].title}
            </div>
          )}
        </div>
      )}
    </>
  );
}