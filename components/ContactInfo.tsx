"use client";

import { Phone, MapPin, Mail } from "lucide-react";

interface ContactItem {
  icon: React.ReactNode;
  title: string;
  line1: string;
  line2: string;
}

const ContactInfo = () => {
  const contacts: ContactItem[] = [
    {
      icon: <Phone size={40} className="text-red-500" />,
      title: "Call Us",
      line1: "",
      line2: "+91 96238 58108",
    },
    {
      icon: <MapPin size={40} className="text-red-500" />,
      title: "Find Us",
      line1: "Casa Lotus, H/No. 4/213 A, Porba Vaddo,",
      line2: "Calangute 403516",
    },
    {
      icon: <Mail size={40} className="text-red-500" />,
      title: "Email Us",
      line1: "Direct Email",
      line2: "info@homesandlandgoa.com",
    },
  ];

  return (
    <section className="bg-[var(--bg-color)]  py-12">
      {/* Heading */}
      <h2 className="text-center text-3xl md:text-4xl font-semibold text-[var(--title)] mb-10 tracking-widest">
        Your Dream House Is One Step Away!
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-11/12 md:w-5/6 mx-auto text-center">
        {contacts.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-lg font-semibold text-[var(--title)] mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600">{item.line1}</p>
            <p className="text-sm text-gray-600">{item.line2}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactInfo;
