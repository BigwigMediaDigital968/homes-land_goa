"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What services does Homes & Land Goa provide?",
    answer:
      "We specialize in buying, selling, and renting premium properties in Goa, with personalized consultation and end-to-end support.",
  },
  {
    question: "Do you assist NRI clients?",
    answer:
      "Yes, we regularly work with NRI clients and provide complete assistance with legal paperwork, compliance, and property management.",
  },
  {
    question: "Can you help with luxury villa investments?",
    answer:
      "Absolutely! We have curated luxury villas and premium properties in Goa with high ROI potential.",
  },
  {
    question: "Do you charge brokerage fees?",
    answer:
      "Our fee structure is transparent, and we ensure you are informed upfront. No hidden charges.",
  },
  {
    question: "How do I schedule a property visit?",
    answer:
      "You can contact us directly via phone, email, or the enquiry form, and our team will schedule a site visit at your convenience.",
  },
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col ">
      {/* Navbar */}

      {/* FAQ Section */}
      <section className="w-11/12 md:w-5/6 mx-auto py-12 md:py-28 px-4 md:px-6 font-raleway flex-grow">
        <motion.h1
          className="text-3xl md:text-5xl font-semibold text-center mb-12 text-[var(--title)]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Frequently Asked Questions
        </motion.h1>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border rounded-lg p-4 cursor-pointer shadow-sm hover:shadow-md transition"
              onClick={() => toggleFAQ(index)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[var(--primary-color)]">
                  {faq.question}
                </h3>
                <span className="text-xl font-bold text-[var(--primary-color)]">
                  {openIndex === index ? "−" : "+"}
                </span>
              </div>

              {/* Animate open/close */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.p
                    className="mt-3 text-gray-600"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
    </div>
  );
};

export default FAQPage;
