import hotelConfig from '@/config/hotelConfig';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';

export default function About() {
  const { about } = hotelConfig;

  return (
    <section id="about" className="py-28 md:py-36 bg-ivory-50">
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
              <SectionHeading eyebrow="Our Story" title={about.title} align="left" />
            </Reveal>
            <div className="mt-8 space-y-5">
              {about.paragraphs.map((paragraph, idx) => (
                <Reveal key={idx} delay={((idx + 1) as 1 | 2 | 3)}>
                  <p className="text-base font-sans font-light text-charcoal-500 leading-relaxed">{paragraph}</p>
                </Reveal>
              ))}
            </div>
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {about.stats.map((stat, idx) => (
                <Reveal key={stat.label} delay={((idx + 1) as 1 | 2 | 3 | 4)}>
                  <div className="text-center sm:text-left">
                    <p className="font-serif text-3xl md:text-4xl font-light text-gold-600">{stat.value}</p>
                    <p className="mt-2 text-xs font-sans font-light text-charcoal-400 uppercase tracking-wide-lg leading-tight">{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
