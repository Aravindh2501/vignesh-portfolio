"use client";

import Link from "next/link";
import { PiArrowRight } from "react-icons/pi";
import { useEffect, useState } from "react";
import { getCategories, type Category } from "@/lib/api";

// SVG icons per category keyword
const CategoryIcon = ({ id }: { id: string }) => {
  const key = id.toLowerCase();

  if (key.includes("wedding"))
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z"/>
        <path d="M12 11V7M10 9h4"/>
        <circle cx="12" cy="9" r="1" fill="currentColor"/>
      </svg>
    );

  if (key.includes("portrait"))
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    );

  if (key.includes("wildlife") || key.includes("wild"))
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7c2-3 6-3 8 0 2-3 6-3 8 0"/>
        <path d="M5 7c0 5 3 9 7 10 4-1 7-5 7-10"/>
        <path d="M9 13c1 1 5 1 6 0"/>
        <circle cx="9" cy="10" r="1" fill="currentColor"/>
        <circle cx="15" cy="10" r="1" fill="currentColor"/>
      </svg>
    );

  if (key.includes("outdoor") || key.includes("nature") || key.includes("landscape"))
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 20h18"/>
        <path d="M5 20L12 6l7 14"/>
        <path d="M9 20l3-8 3 8"/>
        <circle cx="12" cy="4" r="2"/>
      </svg>
    );

  if (key.includes("couple") || key.includes("shoot"))
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="7" r="3"/>
        <circle cx="16" cy="7" r="3"/>
        <path d="M2 20c0-3 2.5-5 6-5"/>
        <path d="M16 15c3.5 0 6 2 6 5"/>
        <path d="M10 15c.6-.3 1.3-.5 2-.5s1.4.2 2 .5"/>
      </svg>
    );

  if (key.includes("cinematic") || key.includes("reel") || key.includes("film") || key.includes("video"))
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="M7 4v16M17 4v16M2 9h5M17 9h5M2 15h5M17 15h5"/>
      </svg>
    );

  if (key.includes("birthday") || key.includes("event") || key.includes("party"))
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <path d="M8 7h.01M12 3v4M16 7h.01"/>
        <rect x="4" y="11" width="16" height="10" rx="1"/>
      </svg>
    );

  if (key.includes("street") || key.includes("city") || key.includes("urban"))
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M3 21V9l6-6h6l6 6v12M9 21V15h6v6M9 9h6M12 6v3"/>
      </svg>
    );

  if (key.includes("travel") || key.includes("trip"))
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>
      </svg>
    );

  if (key.includes("food") || key.includes("product"))
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l19-9-9 19-2-8-8-2z"/>
      </svg>
    );

  // Default camera icon for anything else
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  );
};

export default function CategoryBrowseCard() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
  }, []);

  return (
    <div className="p-4 lg:p-5 bg-muted rounded-xl w-full">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-light">Browse by Category</p>
        <Link
          href="/gallery"
          className="relative text-sm font-light group flex items-center gap-1"
        >
          View All
          <PiArrowRight size={14} />
          <span className="absolute -bottom-[2px] left-0 w-full h-px bg-black dark:bg-white transition-all duration-300 transform ease-in-out group-hover:w-1/3" />
        </Link>
      </div>
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/gallery/${cat.id}`}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background hover:bg-muted-foreground/10 transition-all duration-150 text-sm font-light border border-border"
          >
            <CategoryIcon id={cat.id} />
            <span>{cat.label}</span>
          </Link>
        ))}
        {categories.length === 0 && (
          <p className="text-sm text-muted-foreground">No categories yet</p>
        )}
      </div>
    </div>
  );
}