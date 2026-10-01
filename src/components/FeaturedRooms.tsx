import { Link } from 'react-router-dom';
import { ArrowRight, Users, Maximize, BedDouble } from 'lucide-react';
import hotelConfig from '@/config/hotelConfig';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import { formatPrice } from '@/utils/whatsapp';

export default function FeaturedRooms() {
  const { rooms, sections } = hotelConfig;
  const featured = rooms.slice(0, 2);

  return (
    <section id="rooms" className="py-28 md:py-36 bg-ivory-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <SectionHeading
            eyebrow={sections.featuredRooms.eyebrow}
            title={sections.featuredRooms.title!}
            subtitle={sections.featuredRooms.subtitle}
          />
        </Reveal>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
          {featured.map((room, idx) => (
            <Reveal
              key={room.id}
              delay={((idx % 2) + 1) as 1 | 2}
              className="group"
            >
              <article className="bg-white rounded-sm overflow-hidden shadow-[0_2px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_60px_rgba(0,0,0,0.10)] transition-all duration-700">
                <Link to="/rooms" className="block aspect-[4/3] overflow-hidden bg-ivory-200">
                  <img
                    src={room.image}
                    alt={room.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                </Link>
                <div className="p-8 md:p-10">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-serif text-2xl md:text-3xl font-light text-charcoal-900 leading-tight">
                      {room.name}
                    </h3>
                    <div className="text-right shrink-0">
                      <span className="text-2xl font-numeric font-medium text-gold-600">
                        {formatPrice(room.price)}
                      </span>
                      <span className="block text-xs font-sans text-charcoal-400 uppercase tracking-wide-lg mt-1">
                        per {room.priceUnit}
                      </span>
                    </div>
                  </div>

                  <p className="mt-4 text-sm md:text-base font-sans font-light text-charcoal-500 leading-relaxed">
                    {room.description}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-sans text-charcoal-400 uppercase tracking-wide-lg">
                    <span className="flex items-center gap-2">
                      <Users size={15} className="text-gold-500" />
                      {room.capacity}
                    </span>
                    <span className="flex items-center gap-2">
                      <Maximize size={15} className="text-gold-500" />
                      {room.size}
                    </span>
                    <span className="flex items-center gap-2">
                      <BedDouble size={15} className="text-gold-500" />
                      {room.bed}
                    </span>
                  </div>

                  <Link
                    to="/rooms"
                    className="mt-8 inline-flex items-center gap-2 px-6 py-3 text-sm font-sans font-medium text-charcoal-800 hover:text-gold-500 transition-colors duration-300 group/btn"
                  >
                    View All Rooms
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={3}>
          <div className="mt-14 text-center">
            <Link
              to="/rooms"
              className="inline-flex items-center gap-3 px-9 py-4 bg-gold-500 text-white text-sm font-sans font-medium tracking-wide-lg rounded-sm hover:bg-gold-600 transition-all duration-300 hover:scale-[1.02] shadow-lg group"
            >
              {sections.featuredRooms.viewAllLabel}
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
