"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export function Testimonials() {
  const animation = useScrollAnimation();
  const testimonials = [
    { name: "Dr. Sarah Johnson", role: "Research Scientist", quote: "AIResearch has revolutionized the way I approach my studies. It's like having a team of expert assistants at my fingertips." },
    { name: "Mark Chen", role: "Data Analyst", quote: "The depth and speed of analysis provided by AIResearch is unparalleled. It's become an indispensable tool in my workflow." },
    { name: "Emily Rodriguez", role: "PhD Candidate", quote: "AIResearch has significantly accelerated my literature review process. I can't imagine doing research without it now." },
  ];

  return (
    <motion.section
      id="testimonials"
      ref={animation.ref}
      style={{ opacity: animation.opacity, scale: animation.scale, y: animation.y }}
      className="py-20 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden group"
            >
              <p className="text-gray-400 mb-4 relative z-10">"{testimonial.quote}"</p>
              <div className="flex items-center relative z-10">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
    </motion.section>
  );
}