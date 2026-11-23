"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface FAQ {
  question: string;
  answer: string;
}

interface FAQClientProps {
  faqs: FAQ[];
}

const FAQClient = ({ faqs }: FAQClientProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* FAQ Section */}
      <section className="w-11/12 md:w-5/6 mx-auto py-28 px-6 font-raleway flex-grow">
        <motion.h1
          className="text-3xl md:text-5xl font-bold text-center text-white mb-12"
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
                <h2 className="text-lg font-semibold text-[var(--primary-color)]">
                  {faq.question}
                </h2>
                <span className="text-xl font-bold text-[var(--primary-color)]">
                  {openIndex === index ? "−" : "+"}
                </span>
              </div>

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
    </div>
  );
};

export default FAQClient;
