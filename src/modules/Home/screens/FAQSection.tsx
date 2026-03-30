'use client';
import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How long does it take to process an order?',
    answer: "Orders are processed within 1-2 business days. You'll receive a confirmation once it ships."
  },
  {
    question: 'Do you ship internationally?',
    answer: "Yes, we ship internationally! Delivery times vary by location."
  },
  {
    question: 'What is your return policy?',
    answer: 'We accept returns within 30 days of purchase.'
  },
  {
    question: 'Can I modify or cancel my order after placing it?',
    answer: 'Orders can be modified or canceled within a short window after purchase.'
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  return (
    <section className="bg-[#fcfaf7] py-16">

      {/* ✅ FIX: remove right-side gap */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* LEFT */}
          <div>
            <h3
              className="mb-10"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                fontWeight: 400
              }}
            >
              Discover more in our FAQs
            </h3>

            <div className="border-t border-black/10">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-black/10">

                  {/* QUESTION */}
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between py-6 text-left"
                  >
                    <span className="text-[22px] text-[#1a1a1a] pr-4">
                      {faq.question}
                    </span>

                    <span
                      className={`text-xl transition-transform duration-300 ${
                        openIndex === i ? 'rotate-45' : ''
                      }`}
                    >
                      +
                    </span>
                  </button>

                  {/* ANSWER WITH ANIMATION */}
                  <div
                    className={`grid transition-all duration-500 ease-in-out ${
                      openIndex === i
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-[15px] text-[#1a1a1a]/70 pb-6 max-w-[90%] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex justify-center lg:justify-end">

            <div className="relative w-full max-w-[380px] h-[480px] rounded-lg overflow-hidden">

              <img
                src="https://zest-cosmo.myshopify.com/cdn/shop/files/collapsible-tab-banner.webp?v=1740622463&width=600"
                alt="help"
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">

                <h3
                  className="text-[28px] mb-4"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Still need help?
                </h3>

                <p className="text-sm text-white/80 mb-6 max-w-[260px]">
                  Shoot our team an email & we’ll get back to you ASAP
                </p>

                <button className="bg-white text-[#1a1a1a] text-xs tracking-widest uppercase px-8 py-3 rounded-full hover:opacity-90 transition">
                  CONTACT US
                </button>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}