import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import hotelConfig from '@/config/hotelConfig';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';

export default function FAQ() {
  const { faqs } = hotelConfig;
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-28 md:py-36 bg-ivory-50">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Good to Know"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know before your stay. Can't find your answer? Reach out to our concierge team."
          />
        </Reveal>

        <div className="mt-14 space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <Reveal key={idx} delay={((idx % 3) + 1) as 1 | 2 | 3}>
                <div className="bg-white rounded-sm overflow-hidden border border-ivory-300">
                  <button onClick={() => setOpenIdx(isOpen ? null : idx)} className="w-full flex items-center justify-between gap-4 px-7 py-6 text-left group">
                    <span className="font-serif text-base md:text-lg font-medium text-charcoal-900 group-hover:text-gold-600 transition-colors">{faq.question}</span>
                    <span className="shrink-0 w-8 h-8 rounded-full bg-ivory-100 flex items-center justify-center text-charcoal-500 group-hover:bg-gold-500 group-hover:text-white transition-colors">
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                  <div className={`grid transition-all duration-400 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <p className="px-7 pb-6 text-sm font-sans font-light text-charcoal-500 leading-relaxed">{faq.answer}</p>
                    </div>
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
