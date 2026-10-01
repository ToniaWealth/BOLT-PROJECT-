type PageHeroProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image: string;
};

export default function PageHero({ eyebrow, title, subtitle, image }: PageHeroProps) {
  return (
    <section className="relative h-[55vh] min-h-[420px] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${image}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/60 via-charcoal-950/40 to-charcoal-950/75" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <div className="max-w-3xl animate-fade-in-up" style={{ animationDelay: '0.15s', animationFillMode: 'both' }}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-12 bg-gold-400" />
            <span className="text-xs font-sans font-medium uppercase tracking-[0.35em] text-ivory-200">
              {eyebrow}
            </span>
            <span className="h-px w-12 bg-gold-400" />
          </div>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light text-ivory-50 leading-[1.05] tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 text-lg font-sans font-light text-ivory-100/80 max-w-xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
