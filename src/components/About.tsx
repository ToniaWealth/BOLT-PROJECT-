import hotelConfig from '@/config/hotelConfig';
import { useSiteContent } from '@/lib/useSiteContent';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';

export default function About() {
  const { sections } = hotelConfig;
  const { content } = useSiteContent();

  const stats = [
    { value: content.about_stat_1_value, label: content.about_stat_1_label },
    { value: content.about_stat_2_value, label: content.about_stat_2_label },
    { value: content.about_stat_3_value, label: content.about_stat_3_label },
    { value: content.about_stat_4_value, label: content.about_stat_4_label },
  ].filter((s) => s.value || s.label);

  return (
    <section id="about" className="py-28 md:py-36 bg-ivory-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">
          <Reveal>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-sm bg-ivory-200">
                <img src={content.about_image} alt="Hotel interior" loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-gold-400/30 rounded-sm -z-10 hidden md:block" />
              <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-gold-400/20 rounded-sm -z-10 hidden md:block" />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <SectionHeading eyebrow={sections.about.eyebrow} title={content.about_title} align="left" />
            </Reveal>
            <div className="mt-8 space-y-5">
              {content.about_paragraphs.map((paragraph, idx) => (
                <Reveal key={idx} delay={((idx + 1) as 1 | 2 | 3)}>
                  <p className="text-base font-sans font-light text-charcoal-500 leading-relaxed">{paragraph}</p>
                </Reveal>
              ))}
            </div>
            {stats.length > 0 && (
              <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                  <Reveal key={idx} delay={((idx + 1) as 1 | 2 | 3 | 4)}>
                    <div className="text-center sm:text-left">
                      <p className="font-numeric text-3xl md:text-4xl font-medium text-gold-600">{stat.value}</p>
                      <p className="mt-2 text-xs font-sans font-light text-charcoal-400 uppercase tracking-wide-lg leading-tight">{stat.label}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
