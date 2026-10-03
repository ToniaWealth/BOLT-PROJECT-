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

export type SiteContentRow = {
  id: string;
  hotel_name: string | null;
  tagline: string | null;
  logo_text: string | null;
  logo_subtext: string | null;
  phone: string | null;
  phone_raw: string | null;
  whatsapp_number: string | null;
  email: string | null;
  address_line1: string | null;
  address_line2: string | null;
  about_title: string | null;
  about_paragraphs: string[] | null;
  about_image: string | null;
  about_stat_1_value: string | null;
  about_stat_1_label: string | null;
  about_stat_2_value: string | null;
  about_stat_2_label: string | null;
  about_stat_3_value: string | null;
  about_stat_3_label: string | null;
  about_stat_4_value: string | null;
  about_stat_4_label: string | null;
  updated_at: string;
};

export type SiteContentInput = {
  hotel_name: string;
  tagline: string;
  logo_text: string;
  logo_subtext: string;
  phone: string;
  phone_raw: string;
  whatsapp_number: string;
  email: string;
  address_line1: string;
  address_line2: string;
  about_title: string;
  about_paragraphs: string[];
  about_image: string;
  about_stat_1_value: string;
  about_stat_1_label: string;
  about_stat_2_value: string;
  about_stat_2_label: string;
  about_stat_3_value: string;
  about_stat_3_label: string;
  about_stat_4_value: string;
  about_stat_4_label: string;
};

export type FacilityRow = {
  id: string;
  icon: string;
  title: string;
  description: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type FacilityInput = {
  icon: string;
  title: string;
  description: string;
  sort_order: number;
};
