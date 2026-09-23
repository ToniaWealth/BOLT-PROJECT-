import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import hotelConfig from '@/config/hotelConfig';

export default function Hero() {
  const { hero, name } = hotelConfig;
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVideoLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative h-screen min-h-[700px] w-full overflow-hidden">
      {/* Fallback image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${hero.fallbackImage}')` }}
      />

      {/* Cinematic video */}
      <video
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[2000ms] ${
          videoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        autoPlay
        muted
        loop
        playsInline
        poster={hero.fallbackImage}
      >
        <source src={hero.videoUrl} type="video/mp4" />
      </video>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/50 via-charcoal-950/30 to-charcoal-950/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <div className="max-w-3xl animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px w-12 bg-gold-400" />
            <span className="text-xs font-sans font-medium uppercase tracking-[0.35em] text-ivory-200">
              {name}
            </span>
            <span className="h-px w-12 bg-gold-400" />
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-ivory-50 leading-[1.05] tracking-tight">
            {hero.headline}
          </h1>
          <p className="mt-8 text-lg md:text-xl font-sans font-light text-ivory-100/80 max-w-xl mx-auto leading-relaxed">
            {hero.subtext}
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#book"
              className="px-9 py-4 bg-gold-500 text-white text-sm font-sans font-medium tracking-wide-lg rounded-sm hover:bg-gold-600 transition-all duration-300 hover:scale-[1.02] shadow-lg"
            >
              {hero.primaryCta}
            </a>
            <a
              href="#rooms"
              className="px-9 py-4 border border-ivory-100/30 text-ivory-50 text-sm font-sans font-medium tracking-wide-lg rounded-sm hover:bg-ivory-50/10 transition-all duration-300 backdrop-blur-sm"
            >
              {hero.secondaryCta}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-shimmer">
        <div className="flex flex-col items-center gap-2 text-ivory-200/60">
          <span className="text-[0.625rem] font-sans uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown size={20} className="animate-bounce" />
        </div>
      </div>
    </section>
  );
}
