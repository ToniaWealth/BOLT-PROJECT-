import { Star, Quote } from 'lucide-react';
import hotelConfig from '@/config/hotelConfig';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';

export default function Testimonials() {
  const { testimonials } = hotelConfig;

  return (
    <section className="py-28 md:py-36 bg-ivory-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Guest Stories"
            title="What Our Guests Say"
            subtitle="The words of those who have experienced Aurelia first-hand."
          />
        </Reveal>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {testimonials.map((testimonial, idx) => (
            <Reveal
              key={testimonial.name}
              delay={((idx % 3) + 1) as 1 | 2 | 3}
              className="h-full"
            >
              <div className="h-full bg-white rounded-sm p-9 flex flex-col shadow-[0_2px_24px_rgba(0,0,0,0.04)]">
                <Quote size={36} className="text-gold-400/40 mb-5" />
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={15} className="text-gold-500 fill-gold-500" />
                  ))}
                </div>
                <p className="flex-1 text-sm md:text-base font-sans font-light text-charcoal-600 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <div className="mt-7 flex items-center gap-3 pt-6 border-t border-ivory-300">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-ivory-200 shrink-0">
                    <img src={testimonial.avatar} alt={testimonial.name} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="font-serif text-base font-medium text-charcoal-900">{testimonial.name}</p>
                    <p className="text-xs font-sans font-light text-charcoal-400 uppercase tracking-wide-lg">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
