import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/+919623858108"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      /* Hidden on mobile — MobileContactBar already offers WhatsApp there. */
      className="fixed bottom-10 right-6 mb-11 w-12 h-12 bg-green-500 rounded-full hidden md:flex items-center justify-center shadow-lg z-50"
    >
      <FaWhatsapp className="text-white" size={28} />
    </a>
  );
}
