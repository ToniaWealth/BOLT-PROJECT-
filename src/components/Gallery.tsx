import { useState } from 'react';
import { X } from 'lucide-react';
import hotelConfig from '@/config/hotelConfig';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';

export default function Gallery() {
  const { gallery } = hotelConfig;
  const [lightbox, setLightbox] = useState<string | null>(null);

  const spanClass = (span: string) => {
    switch (span) {
      case 'wide':
        return 'md:col-span-2';
      case 'tall':
        return 'row-span-2';
      default:
        return '';
    }
  };

  return (
    <section id="gallery" className="py-28 md:py-36 bg-ivory-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Visual Journey"
            title="Gallery"
            subtitle="A glimpse into the world of Aurelia — where architecture, nature, and light converge."
          />
        </Reveal>

        <Reveal delay={2}>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[240px] gap-3 md:gap-4">
            {gallery.map((image) => (
              <button
                key={image.src}
                onClick={() => setLightbox(image.src)}
                className={`group relative overflow-hidden rounded-sm bg-ivory-200 ${spanClass(image.span)}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-charcoal-950/0 group-hover:bg-charcoal-950/25 transition-colors duration-500" />
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-charcoal-950/95 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-ivory-50 hover:text-gold-400 transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <X size={32} />
          </button>
          <img
            src={lightbox}
            alt="Gallery enlarged view"
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-sm shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}
