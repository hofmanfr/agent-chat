"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { GlobeAltIcon, CodeBracketIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export function Benefits() {
  const animation = useScrollAnimation();
  const benefits = [
    { icon: <GlobeAltIcon className="h-12 w-12 text-purple-400" />, title: "Internet Access", description: "Leverage the vast knowledge of the internet for comprehensive research" },
    { icon: <CodeBracketIcon className="h-12 w-12 text-blue-400" />, title: "Code Generation", description: "Generate and analyze code snippets to support your research" },
    { icon: <MagnifyingGlassIcon className="h-12 w-12 text-green-400" />, title: "Deep Analysis", description: "Perform in-depth analysis on complex topics and data sets" },
  ];

  return (
    <motion.section
      ref={animation.ref}
      style={{ opacity: animation.opacity, scale: animation.scale, y: animation.y }}
      className="py-20 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
          Supercharge Your Research
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden group"
            >
              <div className="mb-4 relative z-10">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-2 relative z-10">{benefit.title}</h3>
              <p className="text-gray-400 relative z-10">{benefit.description}</p>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
    </motion.section>
  );
}