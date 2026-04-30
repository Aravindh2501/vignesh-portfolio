// frontend/src/components/gallery-bg.tsx
"use client";

import { useEffect, useState } from "react";
import type { Photo } from "@/lib/api";

interface Props {
  photos: Photo[];
}

export default function GalleryBg({ photos }: Props) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (photos.length === 0) return;
    const interval = setInterval(() => {
      setCurrent(() => Math.floor(Math.random() * photos.length));
    }, 2 * 60 * 1000); 
    return () => clearInterval(interval);
  }, [photos]);

  const url = photos[current]?.url ?? "/bg.jpg";

  return (
    <div
      className="w-full h-full relative bg-center bg-cover rounded-xl transition-all duration-1000"
      style={{ backgroundImage: `url(${url})` }}
    />
  );
}