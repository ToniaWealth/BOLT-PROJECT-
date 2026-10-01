import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import hotelConfig from '@/config/hotelConfig';
import PageHero from '@/components/PageHero';
import Rooms from '@/components/Rooms';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';

export default function RoomsPage() {
  const { gallery, hero } = hotelConfig;

  return (
    <>
      <PageHero
        eyebrow="Accommodations"
        title="Rooms & Suites"
        subtitle="Each space is a private retreat — carefully appointed with natural materials, soft light, and unobstructed views."
        image={gallery[0]?.src || hero.fallbackImage}
      />

      <Rooms />

      {/* CTA */}
      <section className="py-24 md:py-32 bg-charcoal-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold-400 blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <SectionHeading
              eyebrow="Ready to Book?"
              title="Reserve Your Stay"
              subtitle="Select your room and dates — we'll generate a pre-filled WhatsApp message for our concierge team."
              light
            />
          </Reveal>
          <Reveal delay={2}>
            <Link
              to="/contact"
              className="mt-12 inline-flex items-center gap-3 px-9 py-4 bg-gold-500 text-white text-sm font-sans font-medium tracking-wide-lg rounded-sm hover:bg-gold-600 transition-all duration-300 hover:scale-[1.02] shadow-lg group"
            >
              Book Now
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
