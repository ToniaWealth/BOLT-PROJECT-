import { useState, useMemo } from 'react';
import { Calendar, BedDouble, Users, MessageCircle } from 'lucide-react';
import hotelConfig from '@/config/hotelConfig';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import { buildBookingMessage, buildWhatsAppUrl } from '@/utils/whatsapp';

function getNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const diff = Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}

export default function BookOnline() {
  const { rooms } = hotelConfig;
  const [selectedRoom, setSelectedRoom] = useState(rooms[0]?.id || '');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const nights = useMemo(() => getNights(checkIn, checkOut), [checkIn, checkOut]);

  const selectedRoomData = rooms.find((r) => r.id === selectedRoom);

  const whatsappUrl = useMemo(() => {
    const roomName = selectedRoomData?.name || 'N/A';
    const message = buildBookingMessage(roomName, checkIn, checkOut, guests);
    return buildWhatsAppUrl(message);
  }, [selectedRoomData, checkIn, checkOut, guests]);

  const canBook = checkIn && checkOut && nights > 0;

  return (
    <section id="book" className="py-28 md:py-36 bg-charcoal-900 relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gold-400 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-gold-600 blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Reservations"
            title="Book Your Stay"
            subtitle="Select your room and dates below. We'll generate a pre-filled WhatsApp message for our concierge team to confirm your reservation."
            light
          />
        </Reveal>

        <Reveal delay={2}>
          <div className="mt-14 bg-ivory-50 rounded-sm p-8 md:p-12 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Room selector */}
              <div>
                <label className="flex items-center gap-2 text-xs font-sans font-medium uppercase tracking-wide-lg text-charcoal-500 mb-3">
                  <BedDouble size={15} className="text-gold-500" />
                  Room Type
                </label>
                <select
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  className="w-full px-4 py-3.5 bg-white border border-ivory-300 rounded-sm text-charcoal-800 font-sans font-light text-sm focus:outline-none focus:border-gold-500 transition-colors cursor-pointer"
                >
                  {rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name} — ${room.price.toLocaleString()}/{room.priceUnit}
                    </option>
                  ))}
                </select>
              </div>

              {/* Guests */}
              <div>
                <label className="flex items-center gap-2 text-xs font-sans font-medium uppercase tracking-wide-lg text-charcoal-500 mb-3">
                  <Users size={15} className="text-gold-500" />
                  Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full px-4 py-3.5 bg-white border border-ivory-300 rounded-sm text-charcoal-800 font-sans font-light text-sm focus:outline-none focus:border-gold-500 transition-colors cursor-pointer"
                >
                  <option value="">Not specified (optional)</option>
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Check-in */}
              <div>
                <label className="flex items-center gap-2 text-xs font-sans font-medium uppercase tracking-wide-lg text-charcoal-500 mb-3">
                  <Calendar size={15} className="text-gold-500" />
                  Check-in Date
                </label>
                <input
                  type="date"
                  min={today}
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full px-4 py-3.5 bg-white border border-ivory-300 rounded-sm text-charcoal-800 font-sans font-light text-sm focus:outline-none focus:border-gold-500 transition-colors cursor-pointer"
                />
              </div>

              {/* Check-out */}
              <div>
                <label className="flex items-center gap-2 text-xs font-sans font-medium uppercase tracking-wide-lg text-charcoal-500 mb-3">
                  <Calendar size={15} className="text-gold-500" />
                  Check-out Date
                </label>
                <input
                  type="date"
                  min={checkIn || today}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full px-4 py-3.5 bg-white border border-ivory-300 rounded-sm text-charcoal-800 font-sans font-light text-sm focus:outline-none focus:border-gold-500 transition-colors cursor-pointer"
                />
              </div>
            </div>

            {/* Summary */}
            {canBook && selectedRoomData && (
              <div className="mt-6 p-5 bg-ivory-100 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-sm font-sans font-light text-charcoal-600">
                  <span className="font-medium text-charcoal-900">{nights}</span> {nights === 1 ? 'night' : 'nights'}{' '}
                  × <span className="font-medium text-charcoal-900">${selectedRoomData.price.toLocaleString()}</span>
                  <span className="block sm:inline sm:ml-2 text-charcoal-400">
                    Total: <span className="font-medium text-gold-600">${(nights * selectedRoomData.price).toLocaleString()}</span>
                  </span>
                </div>
              </div>
            )}

            {/* CTA */}
            <a
              href={canBook ? whatsappUrl : undefined}
              target={canBook ? '_blank' : undefined}
              rel={canBook ? 'noopener noreferrer' : undefined}
              className={`mt-6 w-full flex items-center justify-center gap-3 px-8 py-4 rounded-sm text-sm font-sans font-medium tracking-wide-lg transition-all duration-300 ${
                canBook
                  ? 'bg-[#25D366] text-white hover:bg-[#1da851] hover:scale-[1.01] cursor-pointer'
                  : 'bg-ivory-300 text-charcoal-400 cursor-not-allowed'
              }`}
              onClick={(e) => {
                if (!canBook) e.preventDefault();
              }}
            >
              <MessageCircle size={20} />
              {canBook ? 'Book via WhatsApp' : 'Select dates to book'}
            </a>

            {!canBook && (
              <p className="mt-3 text-center text-xs font-sans font-light text-charcoal-400">
                Please select both check-in and check-out dates to proceed.
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
