import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import hotelConfig from '@/config/hotelConfig';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';

export default function HomeIntro() {
  const { about } = hotelConfig;

  return (
    <section className="py-28 md:py-36 bg-ivory-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">
          <Reveal>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-sm bg-ivory-200">
                <img src={about.image} alt="Hotel interior" loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-gold-400/30 rounded-sm -z-10 hidden md:block" />
              <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-gold-400/20 rounded-sm -z-10 hidden md:block" />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <SectionHeading eyebrow="Welcome to ProlificWealth" title={about.title} align="left" />
            </Reveal>
            <Reveal delay={1}>
              <p className="mt-8 text-base font-sans font-light text-charcoal-500 leading-relaxed">
                {about.paragraphs[0]}
              </p>
            </Reveal>
            <Reveal delay={2}>
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
                {about.stats.map((stat) => (
                  <div key={stat.label} className="text-center sm:text-left">
                    <p className="font-serif text-3xl md:text-4xl font-light text-gold-600">{stat.value}</p>
                    <p className="mt-2 text-xs font-sans font-light text-charcoal-400 uppercase tracking-wide-lg leading-tight">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={3}>
              <Link
                to="/about"
                className="mt-10 inline-flex items-center gap-3 px-7 py-3.5 bg-gold-500 text-white text-sm font-sans font-medium tracking-wide-lg rounded-sm hover:bg-gold-600 transition-all duration-300 hover:scale-[1.02] group"
              >
                Discover Our Story
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
