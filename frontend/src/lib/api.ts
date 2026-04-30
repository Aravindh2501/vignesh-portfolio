const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export interface Photo {
  _id: string;
  title: string;
  category: "portrait" | "couples" | "cinematic" | "wedding";
  url: string;
  publicId: string;
  blurData: string;
  width: number;
  height: number;
  featured: boolean;
  visible: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  label: string;
  description: string;
  coverPhoto: Photo | null;
  count: number;
}

export async function getPhotos(params?: {
  category?: string;
  featured?: boolean;
  limit?: number;
}): Promise<Photo[]> {
  const qs = new URLSearchParams();
  if (params?.category) qs.set("category", params.category);
  if (params?.featured) qs.set("featured", "true");
  if (params?.limit) qs.set("limit", String(params.limit));

  const res = await fetch(`${API_URL}/api/photos?${qs}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data ?? [];
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/api/photos/categories`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data ?? [];
}
