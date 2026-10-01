import hotelConfig from '@/config/hotelConfig';
import PageHero from '@/components/PageHero';
import BookOnline from '@/components/BookOnline';
import Contact from '@/components/Contact';

export default function ContactPage() {
  const { gallery, hero } = hotelConfig;

  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Contact & Reservations"
        subtitle="Our concierge team is available around the clock to assist with reservations, special requests, or any questions."
        image={gallery[5]?.src || hero.fallbackImage}
      />
      <BookOnline />
      <Contact />
    </>
  );
}
