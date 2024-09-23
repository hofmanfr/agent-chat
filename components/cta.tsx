"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { GlowingButton } from "@/components/ui/glowing-button";

export function CTA() {
  const animation = useScrollAnimation();

  return (
    <motion.section
      ref={animation.ref}
      style={{ opacity: animation.opacity, scale: animation.scale, y: animation.y }}
      className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
          Ready to Revolutionize Your Research?
        </h2>
        <p className="text-xl mb-12 text-gray-300">
          Join thousands of researchers who are already using AIResearch to accelerate their discoveries.
        </p>
        <GlowingButton onClick={() => console.log("Start Free Trial clicked")}>
          Start Your Free Trial
        </GlowingButton>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-blue-900 opacity-50"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
    </motion.section>
  );
}