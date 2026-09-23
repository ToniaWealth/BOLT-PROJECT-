import { useEffect, useRef, useState, type ReactNode, type ElementType } from 'react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: 1 | 2 | 3 | 4 | 5;
  as?: ElementType;
};

export default function Reveal({ children, className = '', delay, as: Tag = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delayClass = delay ? ` reveal-delay-${delay}` : '';

  return (
    <Tag
      ref={ref as never}
      className={`reveal${delayClass} ${className} ${visible ? 'is-visible' : ''}`}
    >
      {children}
    </Tag>
  );
}
