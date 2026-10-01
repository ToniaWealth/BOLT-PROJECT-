import hotelConfig from '@/config/hotelConfig';
import PageHero from '@/components/PageHero';
import BookOnline from '@/components/BookOnline';
import Contact from '@/components/Contact';

export default function ContactPage() {
  const { gallery, hero, sections } = hotelConfig;

  return (
    <>
      <PageHero
        eyebrow={sections.contact.eyebrow}
        title="Contact & Reservations"
        subtitle={sections.contact.subtitle}
        image={gallery[5]?.src || hero.fallbackImage}
      />
      <BookOnline />
      <Contact />
    </>
  );
}
