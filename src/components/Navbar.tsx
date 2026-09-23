import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import hotelConfig from '@/config/hotelConfig';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const { navLinks, logoText, logoSubtext, contact } = hotelConfig;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'bg-ivory-50/95 backdrop-blur-md shadow-[0_1px_20px_rgba(0,0,0,0.04)]'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <a href="#home" className="flex flex-col leading-none">
            <span
              className={`font-serif text-2xl font-light tracking-[0.2em] transition-colors duration-700 ${
                scrolled ? 'text-charcoal-900' : 'text-ivory-50'
              }`}
            >
              {logoText}
            </span>
            <span
              className={`text-[0.625rem] font-sans font-medium tracking-[0.35em] uppercase mt-1.5 transition-colors duration-700 ${
                scrolled ? 'text-gold-500' : 'text-gold-300'
              }`}
            >
              {logoSubtext}
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-sans font-light tracking-wide transition-colors duration-300 hover:text-gold-500 ${
                  scrolled ? 'text-charcoal-600' : 'text-ivory-100'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#book"
              className="ml-2 px-7 py-2.5 bg-gold-500 text-white text-sm font-sans font-medium tracking-wide rounded-sm hover:bg-gold-600 transition-colors duration-300"
            >
              Reserve Now
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(true)}
            className={`lg:hidden transition-colors duration-700 ${
              scrolled ? 'text-charcoal-900' : 'text-ivory-50'
            }`}
            aria-label="Open menu"
          >
            <Menu size={26} />
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-500 ${
          menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-charcoal-950/95 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        <div
          className={`absolute right-0 top-0 h-full w-[80%] max-w-sm bg-ivory-50 shadow-2xl transition-transform duration-500 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-6 h-20 border-b border-ivory-200">
            <span className="font-serif text-xl font-light tracking-[0.2em] text-charcoal-900">
              {logoText}
            </span>
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="text-charcoal-600">
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col px-6 py-8 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-3.5 text-lg font-serif font-light text-charcoal-700 border-b border-ivory-200 hover:text-gold-500 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#book"
              onClick={() => setMenuOpen(false)}
              className="mt-6 px-6 py-3 bg-gold-500 text-white text-center text-sm font-sans font-medium tracking-wide rounded-sm hover:bg-gold-600 transition-colors"
            >
              Reserve Now
            </a>
            <a
              href={`tel:${contact.phoneRaw}`}
              className="mt-4 text-center text-sm font-sans font-light text-charcoal-400"
            >
              {contact.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
