// =============================================================
// CENTRAL HOTEL CONFIGURATION
// Update this single file to transform the entire website
// for a new hotel client.
// =============================================================

export const hotelConfig = {
  // ---- Brand & Identity ----
  name: "Aurelia",
  tagline: "Where Stillness Meets the Sea",
  logoText: "AURELIA",
  logoSubtext: "RESORT & SPA",

  // ---- Contact ----
  contact: {
    phone: "+1 (305) 555-0198",
    phoneRaw: "+13055550198",
    email: "reservations@aureliaresort.com",
    whatsappNumber: "13055550198",
    address: {
      line1: "1200 Ocean Crest Drive",
      line2: "Key Largo, FL 33037",
      full: "1200 Ocean Crest Drive, Key Largo, FL 33037, USA",
    },
    hours: {
      checkIn: "3:00 PM",
      checkOut: "11:00 AM",
      reception: "24 Hours",
    },
  },

  // ---- Social ----
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
  },

  // ---- Hero ----
  hero: {
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-illuminated-hotel-pool-at-night-22620-large.mp4",
    fallbackImage:
      "/images/hotels/new-hotel/1.jpg",
    headline: "Where Stillness Meets the Sea",
    subtext:
      "A secluded oceanfront sanctuary on the Florida Keys — designed for those who travel to disappear, not to be seen.",
    primaryCta: "Book Your Stay",
    secondaryCta: "Explore Rooms",
  },

  // ---- Rooms ----
  rooms: [
    {
      id: "ocean-suite",
      name: "Ocean Crest Suite",
      description:
        "A 750 sq ft sanctuary with floor-to-ceiling windows framing the Atlantic. Features a private balcony, king-size bed, and a marble soaking tub.",
      price: 620,
      priceUnit: "night",
      capacity: "2 Guests",
      size: "750 sq ft",
      bed: "King Bed",
      image:
        "/images/hotels/new-hotel/pexels-sureshasam750-18368842.jpg",
      amenities: [
        "Private ocean-view balcony",
        "Marble soaking tub",
        "Nespresso bar",
        "Smart climate control",
        "Plush bathrobes & slippers",
      ],
    },
    {
      id: "garden-villa",
      name: "Garden Villa",
      description:
        "A freestanding villa nestled in tropical gardens with a private plunge pool, outdoor shower, and direct beach access through a private path.",
      price: 890,
      priceUnit: "night",
      capacity: "4 Guests",
      size: "1,200 sq ft",
      bed: "Two Queen Beds",
      image:
        "/images/hotels/new-hotel/pexels-reyd-valencia-2159301653-37797447_(1).jpg",
      amenities: [
        "Private plunge pool",
        "Outdoor rainfall shower",
        "Direct beach access",
        "Lounge terrace",
        "Complimentary minibar",
      ],
    },
    {
      id: "sunset-deluxe",
      name: "Sunset Deluxe Room",
      description:
        "An intimate room positioned to capture golden-hour light. Features a rain shower, custom furnishings, and a cozy reading nook by the window.",
      price: 380,
      priceUnit: "night",
      capacity: "2 Guests",
      size: "450 sq ft",
      bed: "Queen Bed",
      image:
        "/images/hotels/new-hotel/marina-nazina-X0JT2EYZFJg-unsplash.jpg",
      amenities: [
        "Sunset-facing window",
        "Rain shower",
        "Reading nook",
        "Premium linens",
        "Daily housekeeping",
      ],
    },
    {
      id: "presidential-penthouse",
      name: "Presidential Penthouse",
      description:
        "Our crown jewel — a 2,000 sq ft rooftop penthouse with 360° ocean views, a private rooftop terrace, dedicated butler service, and a chef's kitchen.",
      price: 1450,
      priceUnit: "night",
      capacity: "4 Guests",
      size: "2,000 sq ft",
      bed: "King + Two Singles",
      image:
        "/images/hotels/new-hotel/1.jpg",
      amenities: [
        "360° rooftop terrace",
        "Dedicated butler",
        "Chef's kitchen",
        "Private elevator",
        "In-room spa treatments",
      ],
    },
  ],

  // ---- Facilities ----
  facilities: [
    {
      icon: "Waves",
      title: "Infinity Pool",
      description:
        "A 40-meter oceanfront infinity pool that blends seamlessly with the horizon, heated year-round.",
    },
    {
      icon: "Flower2",
      title: "Full-Service Spa",
      description:
        "Six treatment rooms, a steam labyrinth, and signature therapies using local botanicals.",
    },
    {
      icon: "UtensilsCrossed",
      title: "Fine Dining",
      description:
        "Two restaurants helmed by award-winning chefs, featuring seasonal menus and oceanfront seating.",
    },
    {
      icon: "Dumbbell",
      title: "Fitness Center",
      description:
        "A 24-hour fitness studio with Technogym equipment, personal training, and ocean-view yoga.",
    },
    {
      icon: "Palmtree",
      title: "Private Beach",
      description:
        "300 feet of exclusive white-sand beach with cabanas, paddleboards, and snorkeling gear.",
    },
    {
      icon: "Wine",
      title: "Cellar & Bar",
      description:
        "A curated wine cellar with 600+ labels and a craft cocktail bar open until midnight.",
    },
  ],

  // ---- Services ----
  services: [
    {
      icon: "Plane",
      title: "Airport Transfers",
      description:
        "Complimentary luxury shuttle service from Miami International Airport.",
    },
    {
      icon: "ConciergeBell",
      title: "24/7 Concierge",
      description:
        "Personal concierge for dining reservations, excursions, and special requests.",
    },
    {
      icon: "Car",
      title: "Valet Parking",
      description:
        "Complimentary valet parking for all in-house guests throughout their stay.",
    },
    {
      icon: "Sparkles",
      title: "Daily Housekeeping",
      description:
        "Twice-daily housekeeping with turndown service and fresh linens on request.",
    },
    {
      icon: "Dog",
      title: "Pet-Friendly",
      description:
        "We welcome well-behaved pets with beds, bowls, and a special welcome treat.",
    },
    {
      icon: "Wifi",
      title: "High-Speed Wi-Fi",
      description:
        "Fiber-optic Wi-Fi throughout the property at no additional cost.",
    },
  ],

  // ---- Gallery ----
  gallery: [
    {
      src: "/images/hotels/new-hotel/1.jpg",
      alt: "Aerial view of luxury resort surrounded by lush greenery and ocean",
      span: "wide",
    },
    {
      src: "/images/hotels/new-hotel/pexels-reyd-valencia-2159301653-37797447_(1).jpg",
      alt: "Grand hotel lobby with staircase, marble floors, and chandelier",
      span: "tall",
    },
    {
      src: "/images/hotels/new-hotel/pexels-sureshasam750-18368842.jpg",
      alt: "Luxurious poolside cabana at a hillside resort",
      span: "normal",
    },
    {
      src: "/images/hotels/new-hotel/marina-nazina-X0JT2EYZFJg-unsplash.jpg",
      alt: "Romantic fine dining table setting with candlelight",
      span: "normal",
    },
    {
      src: "/images/hotels/new-hotel/pexels-reyd-valencia-2159301653-37797447_(1).jpg",
      alt: "Modern luxury fitness center with equipment and city views",
      span: "normal",
    },
    {
      src: "/images/hotels/new-hotel/1.jpg",
      alt: "Tropical beach at twilight with illuminated palm trees",
      span: "wide",
    },
    {
      src: "/images/hotels/new-hotel/marina-nazina-X0JT2EYZFJg-unsplash.jpg",
      alt: "Luxurious breakfast scene with fresh pastries and coffee",
      span: "normal",
    },
    {
      src: "/images/hotels/new-hotel/pexels-sureshasam750-18368842.jpg",
      alt: "Elegant spa interior with massage table and calming ambiance",
      span: "tall",
    },
  ],

  // ---- Testimonials ----
  testimonials: [
    {
      name: "Eleanor Whitfield",
      location: "London, UK",
      avatar:
        "/images/hotels/new-hotel/marina-nazina-X0JT2EYZFJg-unsplash.jpg",
      rating: 5,
      text: "The most tranquil five days of our year. The Ocean Crest Suite felt like a private home above the sea. Every detail — from the turndown service to the morning coffee on the balcony — was effortless.",
    },
    {
      name: "Marcus Delgado",
      location: "Buenos Aires, AR",
      avatar:
        "/images/hotels/new-hotel/pexels-reyd-valencia-2159301653-37797447_(1).jpg",
      rating: 5,
      text: "We've stayed at resorts across three continents. Aurelia is the first place where the service felt invisible yet perfect. The spa alone is worth the trip — I left feeling ten years younger.",
    },
    {
      name: "Priya Nair",
      location: "Mumbai, IN",
      avatar:
        "/images/hotels/new-hotel/pexels-sureshasam750-18368842.jpg",
      rating: 5,
      text: "The Garden Villa with its private plunge pool was beyond anything we imagined. Our kids still talk about the beach path every morning. This is what a family vacation should feel like.",
    },
  ],

  // ---- About ----
  about: {
    title: "A Sanctuary Built on Stillness",
    paragraphs: [
      "Aurelia was born from a simple idea: that true luxury is not about what is added, but what is removed — the noise, the rush, the pressure to be anywhere other than here.",
      "Nestled on seven acres of protected oceanfront on Key Largo, every corner of Aurelia was designed by award-winning architects to dissolve the boundary between indoors and the natural world. Floor-to-ceiling glass, sustainably sourced stone, and native tropical gardens create a space that breathes.",
      "Our team of 120 hospitality professionals — many with us since opening — are trained to anticipate, not intrude. From the moment you arrive, your only task is to be still.",
    ],
    stats: [
      { value: "7", label: "Acres of Oceanfront" },
      { value: "48", label: "Rooms & Suites" },
      { value: "600+", label: "Wine Labels" },
      { value: "4.9", label: "Guest Rating" },
    ],
    image:
      "/images/hotels/new-hotel/1.jpg",
  },

  // ---- FAQ ----
  faqs: [
    {
      question: "What is your check-in and check-out policy?",
      answer:
        "Check-in begins at 3:00 PM and check-out is by 11:00 AM. Early check-in and late check-out are available upon request, subject to availability and a nominal fee.",
    },
    {
      question: "Is breakfast included in the room rate?",
      answer:
        "A continental breakfast buffet is included with all room types. A la carte breakfast and in-room dining are available for an additional charge.",
    },
    {
      question: "Do you offer airport transportation?",
      answer:
        "Yes, we provide complimentary luxury shuttle service from Miami International Airport. Reservations must be made at least 48 hours in advance through our concierge.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "Free cancellation is available up to 14 days before arrival. Within 14 days, the first night is non-refundable. Peak season reservations may have modified terms — please confirm at booking.",
    },
    {
      question: "Are pets allowed?",
      answer:
        "Yes, Aurelia is a pet-friendly resort. Well-behaved pets are welcome in select room types with a one-time pet fee of $150, which includes a pet bed, bowls, and a welcome treat.",
    },
    {
      question: "Is the spa open to non-guests?",
      answer:
        "The spa is primarily for in-house guests, but limited appointments are available for outside visitors with advance reservation. Please contact our concierge for availability.",
    },
  ],

  // ---- Navigation ----
  navLinks: [
    { label: "Rooms", href: "#rooms" },
    { label: "Book", href: "#book" },
    { label: "Facilities", href: "#facilities" },
    { label: "Gallery", href: "#gallery" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
};

export default hotelConfig;
