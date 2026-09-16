interface FloatingWhatsAppButtonProps {
  whatsappNumber: string;
}

export function FloatingWhatsAppButton({
  whatsappNumber,
}: FloatingWhatsAppButtonProps) {
  const message = encodeURIComponent(
    "Hola, estoy viendo el catálogo de Selaure Beauty y quisiera recibir más información."
  );

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-5 right-5 z-[80] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition duration-300 hover:scale-110"
    >
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M16.04 3C9.39 3 4 8.31 4 14.86c0 2.62.87 5.05 2.35 7.02L4.8 27l5.3-1.38a12.2 12.2 0 0 0 5.94 1.53C22.69 27.15 28 21.84 28 15.29 28 8.73 22.69 3 16.04 3Zm0 21.99c-1.84 0-3.64-.5-5.21-1.45l-.37-.22-3.14.82.84-3.03-.24-.39a9.65 9.65 0 0 1-1.49-5.16c0-5.31 4.34-9.63 9.67-9.63 5.33 0 9.67 4.32 9.67 9.63 0 5.31-4.34 9.43-9.73 9.43Zm5.3-7.2c-.29-.14-1.71-.84-1.98-.93-.27-.1-.46-.14-.66.14-.19.29-.75.93-.92 1.12-.17.19-.34.22-.63.07-.29-.14-1.22-.45-2.32-1.43-.86-.76-1.44-1.7-1.61-1.99-.17-.29-.02-.44.13-.59.13-.13.29-.34.44-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.14-.66-1.58-.9-2.17-.24-.57-.48-.49-.66-.5h-.56c-.19 0-.51.07-.78.36-.27.29-1.02 1-1.02 2.43s1.05 2.82 1.19 3.01c.14.19 2.06 3.14 4.99 4.4.7.3 1.24.48 1.66.61.7.22 1.34.19 1.84.12.56-.08 1.71-.7 1.95-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.33Z" />
      </svg>
    </a>
  );
}