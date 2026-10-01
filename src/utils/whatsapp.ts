import hotelConfig from '@/config/hotelConfig';

function getOrdinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

function formatDateWithOrdinal(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const month = d.toLocaleDateString('en-US', { month: 'long' });
  const day = d.getDate();
  return `${month} ${day}${getOrdinal(day)}`;
}

export function buildRoomInquiryMessage(roomName: string): string {
  return hotelConfig.whatsapp.roomInquiryTemplate.replace('{roomName}', roomName);
}

export function buildBookingMessage(
  roomName: string,
  checkIn: string,
  checkOut: string,
  guests?: string
): string {
  const checkInFmt = formatDateWithOrdinal(checkIn);
  const checkOutFmt = formatDateWithOrdinal(checkOut);

  let guestsStr = '';
  if (guests && guests !== '0' && guests !== '') {
    const n = parseInt(guests, 10);
    guestsStr = ` for ${n} ${n === 1 ? 'adult' : 'adults'}`;
  }

  return hotelConfig.whatsapp.bookingTemplate
    .replace('{roomName}', roomName)
    .replace('{checkIn}', checkInFmt || 'N/A')
    .replace('{checkOut}', checkOutFmt || 'N/A')
    .replace('{guests}', guestsStr);
}

export function buildGeneralInquiryMessage(): string {
  return hotelConfig.whatsapp.generalInquiryMessage;
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${hotelConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function formatPrice(price: number): string {
  const { currencySymbol } = hotelConfig.theme;
  return `${currencySymbol}${price.toLocaleString()}`;
}
