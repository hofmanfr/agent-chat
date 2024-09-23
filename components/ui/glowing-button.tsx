"use client";

import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface GlowingButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: React.ReactNode;
}

export function GlowingButton({ children, ...props }: GlowingButtonProps) {
  return (
    <button
      {...props}
      className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group"
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-300 opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-xl"></div>
    </button>
  );
}