export type Room = {
  id: string;
  name: string;
  description: string;
  price: number;
  priceUnit: string;
  capacity: string;
  size: string;
  bed: string;
  image: string;
  amenities: string[];
};

export type Facility = {
  icon: string;
  title: string;
  description: string;
};

export type Service = {
  icon: string;
  title: string;
  description: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
  span: 'wide' | 'tall' | 'normal';
};

export type Testimonial = {
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type NavLink = {
  label: string;
  href: string;
};

export type HotelConfig = {
  name: string;
  tagline: string;
  logoText: string;
  logoSubtext: string;
  contact: {
    phone: string;
    phoneRaw: string;
    email: string;
    whatsappNumber: string;
    address: { line1: string; line2: string; full: string };
    hours: { checkIn: string; checkOut: string; reception: string };
  };
  social: { instagram: string; facebook: string; twitter: string };
  hero: {
    videoUrl: string;
    fallbackImage: string;
    headline: string;
    subtext: string;
    primaryCta: string;
    secondaryCta: string;
  };
  rooms: Room[];
  facilities: Facility[];
  services: Service[];
  gallery: GalleryImage[];
  testimonials: Testimonial[];
  about: {
    title: string;
    paragraphs: string[];
    stats: { value: string; label: string }[];
    image: string;
  };
  faqs: FAQItem[];
  navLinks: NavLink[];
};

declare const hotelConfig: HotelConfig;
export default hotelConfig;
