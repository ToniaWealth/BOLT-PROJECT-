import { Instagram, Facebook, Twitter, Phone, Mail, MapPin } from 'lucide-react';
import hotelConfig from '@/config/hotelConfig';

export default function Footer() {
  const { name, logoText, logoSubtext, contact, social, navLinks, tagline } = hotelConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-950 text-ivory-200/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Top section */}
        <div className="py-20 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
            {/* Brand */}
            <div className="md:col-span-5">
              <div className="flex flex-col leading-none mb-6">
                <span className="font-serif text-3xl font-light tracking-[0.2em] text-ivory-50">
                  {logoText}
                </span>
                <span className="text-[0.625rem] font-sans font-medium tracking-[0.35em] uppercase mt-2 text-gold-400">
                  {logoSubtext}
                </span>
              </div>
              <p className="text-base font-sans font-light leading-relaxed max-w-sm">
                {tagline}
              </p>
              <div className="mt-8 flex items-center gap-4">
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-ivory-200/15 flex items-center justify-center hover:bg-gold-500 hover:border-gold-500 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram size={16} className="text-ivory-200" />
                </a>
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-ivory-200/15 flex items-center justify-center hover:bg-gold-500 hover:border-gold-500 transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook size={16} className="text-ivory-200" />
                </a>
                <a
                  href={social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-ivory-200/15 flex items-center justify-center hover:bg-gold-500 hover:border-gold-500 transition-all duration-300"
                  aria-label="Twitter"
                >
                  <Twitter size={16} className="text-ivory-200" />
                </a>
              </div>
            </div>

            {/* Explore */}
            <div className="md:col-span-3">
              <h4 className="text-[0.625rem] font-sans font-medium uppercase tracking-[0.3em] text-gold-400 mb-6">
                Explore
              </h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm font-sans font-light text-ivory-200/60 hover:text-gold-400 transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="md:col-span-4">
              <h4 className="text-[0.625rem] font-sans font-medium uppercase tracking-[0.3em] text-gold-400 mb-6">
                Contact
              </h4>
              <ul className="space-y-4 text-sm font-sans font-light">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-gold-400 mt-0.5 shrink-0" />
                  <span className="text-ivory-200/60 leading-relaxed">
                    {contact.address.line1}<br />{contact.address.line2}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-gold-400 shrink-0" />
                  <a href={`tel:${contact.phoneRaw}`} className="text-ivory-200/60 hover:text-gold-400 transition-colors">
                    {contact.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-gold-400 shrink-0" />
                  <a href={`mailto:${contact.email}`} className="text-ivory-200/60 hover:text-gold-400 transition-colors break-all">
                    {contact.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-ivory-200/10" />

        {/* Bottom bar */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans font-light">
          <p className="text-ivory-200/40">
            &copy; {year} {name}. All rights reserved.
          </p>
          <p className="flex items-center gap-6 text-ivory-200/40">
            <a href="#" className="hover:text-gold-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold-400 transition-colors">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
