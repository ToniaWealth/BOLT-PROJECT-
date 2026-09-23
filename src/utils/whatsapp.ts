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
  return `Hello, I would like to check availability for the ${roomName}. Please let me know available dates.`;
}

export function buildBookingMessage(
  roomName: string,
  checkIn: string,
  checkOut: string,
  guests?: string
): string {
  const checkInFmt = formatDateWithOrdinal(checkIn);
  const checkOutFmt = formatDateWithOrdinal(checkOut);

  let message = `Hello, I would like to book the ${roomName}`;
  if (checkInFmt && checkOutFmt) {
    message += ` from ${checkInFmt} to ${checkOutFmt}`;
  }
  if (guests && guests !== '0' && guests !== '') {
    const n = parseInt(guests, 10);
    message += ` for ${n} ${n === 1 ? 'adult' : 'adults'}`;
  }
  message += '. Please check availability.';

  return message;
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${hotelConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
