export function buildWhatsAppLink({
  propertyName,
  checkIn,
  checkOut,
  guests,
}: {
  propertyName: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
}): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  const lines = [`Hi! I'm interested in ${propertyName} on Djerba Stays.`];

  if (checkIn && checkOut) {
    lines.push(`Dates: ${checkIn} to ${checkOut}`);
  }

  if (guests) {
    lines.push(`Guests: ${guests}`);
  }

  const message = encodeURIComponent(lines.join("\n"));

  if (!number) {
    return `https://wa.me/?text=${message}`;
  }

  return `https://wa.me/${number}?text=${message}`;
}