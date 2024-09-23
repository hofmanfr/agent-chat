"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { LightBulbIcon, ChartBarIcon, CloudIcon } from "@heroicons/react/24/outline";

export function Features() {
  const animation = useScrollAnimation();
  const features = [
    { icon: <LightBulbIcon className="h-12 w-12 text-yellow-400" />, title: "Intelligent Insights", description: "AI-driven analysis for deeper understanding" },
    { icon: <ChartBarIcon className="h-12 w-12 text-green-400" />, title: "Data Visualization", description: "Transform complex data into clear visuals" },
    { icon: <CloudIcon className="h-12 w-12 text-blue-400" />, title: "Cloud Integration", description: "Seamless connection with popular cloud services" },
  ];

  return (
    <motion.section
      id="features"
      ref={animation.ref}
      style={{ opacity: animation.opacity, scale: animation.scale, y: animation.y }}
      className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
          Cutting-Edge Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden group"
            >
              <div className="mb-4 relative z-10">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 relative z-10">{feature.title}</h3>
              <p className="text-gray-400 relative z-10">{feature.description}</p>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
    </motion.section>
  );
}