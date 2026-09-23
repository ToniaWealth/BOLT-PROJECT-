import {
  Waves, Flower2, UtensilsCrossed, Dumbbell, Palmtree, Wine,
  Plane, ConciergeBell, Car, Sparkles, Dog, Wifi,
  type LucideIcon,
} from 'lucide-react';
import hotelConfig from '@/config/hotelConfig';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';

const iconMap: Record<string, LucideIcon> = {
  Waves, Flower2, UtensilsCrossed, Dumbbell, Palmtree, Wine,
  Plane, ConciergeBell, Car, Sparkles, Dog, Wifi,
};

export default function Facilities() {
  const { facilities } = hotelConfig;

  return (
    <section id="facilities" className="py-28 md:py-36 bg-ivory-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Amenities"
            title="Resort Facilities"
            subtitle="Everything you need is woven into the landscape — from the infinity pool that meets the ocean to the spa tucked among the palms."
          />
        </Reveal>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {facilities.map((facility, idx) => {
            const Icon = iconMap[facility.icon] || Sparkles;
            return (
              <Reveal
                key={facility.title}
                delay={((idx % 3) + 1) as 1 | 2 | 3}
              >
                <div className="group h-full bg-white rounded-sm p-10 hover:shadow-[0_12px_50px_rgba(0,0,0,0.06)] transition-all duration-700 border border-ivory-200 hover:border-gold-200">
                  <div className="w-14 h-14 rounded-full bg-ivory-100 flex items-center justify-center mb-6 group-hover:bg-gold-500 transition-colors duration-500">
                    <Icon size={26} className="text-gold-500 group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="font-serif text-xl font-medium text-charcoal-900 mb-3">
                    {facility.title}
                  </h3>
                  <p className="text-sm font-sans font-light text-charcoal-500 leading-relaxed">
                    {facility.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
