"use client";

import { useState } from "react";

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState("home");

  return (
    <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-gray-800 bg-opacity-80 backdrop-blur-lg rounded-full px-6 py-3 shadow-2xl">
      <ul className="flex space-x-6">
        {["home", "features", "how-it-works", "testimonials", "pricing", "faq"].map((section) => (
          <li key={section}>
            <a
              href={`#${section}`}
              className={`text-sm font-medium ${activeSection === section ? "text-purple-400" : "text-gray-300 hover:text-purple-400"} transition-colors`}
              onClick={() => setActiveSection(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}