export type RoomRow = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  price_unit: string;
  capacity: string;
  size: string;
  bed: string;
  image: string;
  amenities: string[];
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type RoomInput = {
  name: string;
  description: string;
  price: number;
  price_unit: string;
  capacity: string;
  size: string;
  bed: string;
  image: string;
  amenities: string[];
  sort_order: number;
  is_published: boolean;
};

export type BlogRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string;
  published_at: string | null;
  status: 'published' | 'draft';
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type BlogInput = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  published_at: string | null;
  status: 'published' | 'draft';
  sort_order: number;
};
