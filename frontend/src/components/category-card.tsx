"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import VectorTopLeftAnimation from "@/components/vector-top-left-animation";
import type { Category } from "@/lib/api";

interface Props {
  category: Category;
}

const CategoryCard = ({ category }: Props) => {
  const router = useRouter();

  return (
    <div
      className="w-full relative group cursor-pointer"
      onClick={() => router.push(`/gallery/${category.id}`)}
    >
      <AspectRatio
        ratio={0.75 / 1}
        className="overflow-hidden rounded-lg relative bg-muted"
      >
        {category.coverPhoto ? (
          <Image
            src={category.coverPhoto.url}
            alt={category.label}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1535px) 50vw, 33vw"
            quality={65}
            className="object-cover lg:group-hover:blur-sm lg:transition-[filter] lg:duration-300 lg:ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <p className="text-muted-foreground text-sm">{category.label}</p>
          </div>
        )}
      </AspectRatio>

      <div className="absolute top-0 left-0 z-20">
        <VectorTopLeftAnimation title={`${category.label} (${category.count})`} />
      </div>
    </div>
  );
};

export default CategoryCard;
