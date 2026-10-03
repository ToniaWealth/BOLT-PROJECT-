import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import hotelConfig from '@/config/hotelConfig';
import { useSiteContent } from '@/lib/useSiteContent';
import Hero from '@/components/Hero';
import HomeIntro from '@/components/HomeIntro';
import FeaturedRooms from '@/components/FeaturedRooms';
import Facilities from '@/components/Facilities';
import Testimonials from '@/components/Testimonials';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';

export default function Home() {
  const { gallery, testimonials, sections } = hotelConfig;
  const { content } = useSiteContent();
  const previewGallery = gallery.slice(0, 6);

  return (
    <>
      <Hero />
      <HomeIntro />
      <FeaturedRooms />

      {/* Facilities preview */}
      <Facilities />

      {/* Gallery preview */}
      <section id="gallery" className="py-28 md:py-36 bg-ivory-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <SectionHeading
              eyebrow={sections.gallery.eyebrow}
              title={sections.gallery.title!}
              subtitle={(sections.gallery.subtitle || '').replace('{hotelName}', content.hotel_name)}
            />
          </Reveal>
          <Reveal delay={2}>
            <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {previewGallery.map((image) => (
                <div key={image.src} className="group relative overflow-hidden rounded-sm bg-ivory-200 aspect-[4/3]">
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-charcoal-950/0 group-hover:bg-charcoal-950/25 transition-colors duration-500" />
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={3}>
            <div className="mt-12 text-center">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-sans font-medium text-charcoal-800 hover:text-gold-500 transition-colors duration-300 group"
              >
                View Full Gallery
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials preview (first 2) */}
      <Testimonials testimonials={testimonials.slice(0, 2)} />

      {/* CTA banner */}
      <section className="py-24 md:py-32 bg-charcoal-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold-400 blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <SectionHeading
              eyebrow={sections.ctaBanner.eyebrow}
              title={sections.ctaBanner.title!}
              subtitle={(sections.ctaBanner.subtitle || '').replace('{hotelName}', content.hotel_name)}
              light
            />
          </Reveal>
          <Reveal delay={2}>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="px-9 py-4 bg-gold-500 text-white text-sm font-sans font-medium tracking-wide-lg rounded-sm hover:bg-gold-600 transition-all duration-300 hover:scale-[1.02] shadow-lg"
              >
                Book Your Stay
              </Link>
              <Link
                to="/rooms"
                className="px-9 py-4 border border-ivory-100/30 text-ivory-50 text-sm font-sans font-medium tracking-wide-lg rounded-sm hover:bg-ivory-50/10 transition-all duration-300"
              >
                View Rooms
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
