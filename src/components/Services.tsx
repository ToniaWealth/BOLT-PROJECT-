import {
  Plane, ConciergeBell, Car, Sparkles, Dog, Wifi,
  type LucideIcon,
} from 'lucide-react';
import hotelConfig from '@/config/hotelConfig';
import Reveal from '@/components/Reveal';

const serviceIconMap: Record<string, LucideIcon> = {
  Plane, ConciergeBell, Car, Sparkles, Dog, Wifi,
};

export default function Services() {
  const { services } = hotelConfig;

  return (
    <section className="py-28 md:py-36 bg-charcoal-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold-400 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-5">
              <span className="h-px w-10 bg-gold-400" />
              <span className="text-xs font-sans font-medium uppercase tracking-[0.3em] text-gold-400">
                Guest Services
              </span>
              <span className="h-px w-10 bg-gold-400" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.25rem] font-light text-ivory-50 leading-[1.1]">
              Effortless, Invisible, Attentive
            </h2>
          </div>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14">
          {services.map((service, idx) => {
            const Icon = serviceIconMap[service.icon] || Sparkles;
            return (
              <Reveal
                key={service.title}
                delay={((idx % 3) + 1) as 1 | 2 | 3}
                className="text-center sm:text-left"
              >
                <div className="flex flex-col sm:flex-row items-start gap-5">
                  <div className="w-12 h-12 rounded-full border border-gold-400/30 flex items-center justify-center shrink-0 mx-auto sm:mx-0">
                    <Icon size={22} className="text-gold-400" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-medium text-ivory-50 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm font-sans font-light text-ivory-200/65 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
