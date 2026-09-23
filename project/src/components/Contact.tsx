import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import hotelConfig from '@/config/hotelConfig';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';

export default function Contact() {
  const { contact, name } = hotelConfig;

  const generalWhatsAppUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
    `Hello ${name}, I have a question about my upcoming stay.`
  )}`;

  return (
    <section id="contact" className="py-28 md:py-36 bg-charcoal-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05]">
        <div className="absolute -bottom-32 right-0 w-96 h-96 rounded-full bg-gold-600 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 lg:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Get in Touch"
            title="Contact Us"
            subtitle="Our concierge team is available around the clock to assist with reservations, special requests, or any questions you may have."
            light
          />
        </Reveal>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Reveal>
            <a href={`tel:${contact.phoneRaw}`} className="group h-full bg-ivory-50/5 border border-ivory-50/10 rounded-sm p-7 text-center hover:bg-ivory-50/10 transition-all duration-300 flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gold-500/20 flex items-center justify-center mb-5 group-hover:bg-gold-500 transition-colors duration-300">
                <Phone size={22} className="text-gold-400 group-hover:text-white transition-colors duration-300" />
              </div>
              <p className="text-xs font-sans font-light uppercase tracking-wide-lg text-ivory-200/60 mb-1">Call Us</p>
              <p className="font-serif text-sm text-ivory-50">{contact.phone}</p>
            </a>
          </Reveal>

          <Reveal delay={2}>
            <a href={`mailto:${contact.email}`} className="group h-full bg-ivory-50/5 border border-ivory-50/10 rounded-sm p-7 text-center hover:bg-ivory-50/10 transition-all duration-300 flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gold-500/20 flex items-center justify-center mb-5 group-hover:bg-gold-500 transition-colors duration-300">
                <Mail size={22} className="text-gold-400 group-hover:text-white transition-colors duration-300" />
              </div>
              <p className="text-xs font-sans font-light uppercase tracking-wide-lg text-ivory-200/60 mb-1">Email Us</p>
              <p className="font-serif text-sm text-ivory-50 break-all">{contact.email}</p>
            </a>
          </Reveal>

          <Reveal delay={3}>
            <a href={generalWhatsAppUrl} target="_blank" rel="noopener noreferrer" className="group h-full bg-ivory-50/5 border border-ivory-50/10 rounded-sm p-7 text-center hover:bg-ivory-50/10 transition-all duration-300 flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gold-500/20 flex items-center justify-center mb-5 group-hover:bg-gold-500 transition-colors duration-300">
                <MessageCircle size={22} className="text-gold-400 group-hover:text-white transition-colors duration-300" />
              </div>
              <p className="text-xs font-sans font-light uppercase tracking-wide-lg text-ivory-200/60 mb-1">WhatsApp</p>
              <p className="font-serif text-sm text-ivory-50">Chat Now</p>
            </a>
          </Reveal>

          <Reveal delay={4}>
            <div className="group h-full bg-ivory-50/5 border border-ivory-50/10 rounded-sm p-7 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gold-500/20 flex items-center justify-center mb-5">
                <MapPin size={22} className="text-gold-400" />
              </div>
              <p className="text-xs font-sans font-light uppercase tracking-wide-lg text-ivory-200/60 mb-1">Visit Us</p>
              <p className="font-serif text-sm text-ivory-50">{contact.address.line1}</p>
              <p className="font-serif text-sm text-ivory-50">{contact.address.line2}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
