"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { GlowingButton } from "@/components/ui/glowing-button";

export function Pricing() {
  const animation = useScrollAnimation();
  const plans = [
    { name: "Basic", price: "$49", features: ["5 research topics/month", "Basic internet search", "24/7 AI assistance"] },
    { name: "Pro", price: "$99", features: ["Unlimited research topics", "Advanced internet search", "Code generation", "Priority support"] },
    { name: "Enterprise", price: "Custom", features: ["Custom AI model training", "API access", "Dedicated account manager", "Custom integrations"] },
  ];

  return (
    <motion.section
      id="pricing"
      ref={animation.ref}
      style={{ opacity: animation.opacity, scale: animation.scale, y: animation.y }}
      className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
          Choose Your Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col relative overflow-hidden group"
            >
              <h3 className="text-2xl font-semibold mb-4 relative z-10">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6 relative z-10">{plan.price}</p>
              <ul className="mb-8 flex-grow relative z-10">
                {plan.features.map((feature, i) => (
                  <li key={i} className="mb-2 flex items-center">
                    <SparklesIcon className="h-5 w-5 mr-2 text-purple-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <GlowingButton onClick={() => console.log(`${plan.name} plan selected`)}>
                Get Started
              </GlowingButton>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
    </motion.section>
  );
}