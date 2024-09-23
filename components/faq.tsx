"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useState } from "react";

export function FAQ() {
  const animation = useScrollAnimation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    { question: "How does AIResearch use CrewAI Agents?", answer: "AIResearch leverages CrewAI Agents to perform collaborative, multi-step research tasks. These agents work together to search the internet, analyze data, and generate insights based on your research topic." },
    { question: "Can AIResearch generate code for my projects?", answer: "Yes, AIResearch can generate code snippets and analyze existing code to support your research projects. This feature is particularly useful for data analysis, algorithm implementation, and software development research." },
    { question: "Is my research data kept confidential?", answer: "Absolutely. We take data privacy very seriously. All research data is encrypted and stored securely. Our AI agents process your data without retaining any personal information." },
    { question: "How accurate are the research results?", answer: "AIResearch strives for high accuracy by cross-referencing multiple sources and using advanced AI algorithms. However, we always recommend verifying critical information from primary sources." },
  ];

  return (
    <motion.section
      id="faq"
      ref={animation.ref}
      style={{ opacity: animation.opacity, scale: animation.scale, y: animation.y }}
      className="py-20 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              <button
                className="w-full p-4 text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <span className={`transform transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}>
                    ▼
                  </span>
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 pb-4"
                  >
                    <p className="text-gray-400">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
    </motion.section>
  );
}