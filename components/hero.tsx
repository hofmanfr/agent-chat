"use client";

import { GlowingButton } from "@/components/ui/glowing-button";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="w-full px-6 relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text animate-pulse">
          AI-Powered Research Revolution
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-300">
          Harness the power of AI to supercharge your research with CrewAI Agents
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/sign-up">
            <GlowingButton>
              Get Started
            </GlowingButton>
          </Link>
          <Link href="/sign-in">
            <GlowingButton>
              Sign In
            </GlowingButton>
          </Link>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDownIcon className="h-8 w-8 text-purple-400" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900 to-gray-900 opacity-30"></div>
    </section>
  );
}
