type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'mx-auto text-center' : 'text-left';
  const titleColor = light ? 'text-ivory-50' : 'text-charcoal-900';
  const subColor = light ? 'text-ivory-200/70' : 'text-charcoal-500';

  return (
    <div className={`max-w-2xl ${alignClass}`}>
      {eyebrow && (
        <div
          className={`flex items-center gap-3 mb-5 ${
            align === 'center' ? 'justify-center' : ''
          }`}
        >
          <span className="h-px w-10 bg-gold-500" />
          <span className="text-xs font-sans font-medium uppercase tracking-[0.3em] text-gold-500">
            {eyebrow}
          </span>
          <span className="h-px w-10 bg-gold-500" />
        </div>
      )}
      <h2 className={`font-serif text-4xl md:text-5xl lg:text-[3.25rem] font-light leading-[1.1] ${titleColor}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-5 text-base md:text-lg font-sans font-light leading-relaxed ${subColor}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export type { SectionHeadingProps };
