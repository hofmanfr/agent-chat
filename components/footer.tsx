"use client";

export function Footer() {
  return (
    <footer className="bg-gray-900 py-12 relative overflow-hidden">
      <div className="container mx-auto px-6 flex flex-wrap justify-between items-center relative z-10">
        <div className="w-full md:w-1/3 text-center md:text-left mb-6 md:mb-0">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">AIResearch</h3>
          <p className="mt-2 text-sm text-gray-500">Empowering research with AI</p>
        </div>
        <div className="w-full md:w-1/3 text-center mb-6 md:mb-0">
          <a href="#" className="text-gray-500 hover:text-purple-400 mx-3 transition-colors duration-300">Terms</a>
          <a href="#" className="text-gray-500 hover:text-purple-400 mx-3 transition-colors duration-300">Privacy</a>
          <a href="#" className="text-gray-500 hover:text-purple-400 mx-3 transition-colors duration-300">Contact</a>
        </div>
        <div className="w-full md:w-1/3 text-center md:text-right">
          <p className="text-sm text-gray-500">&copy; 2024 AIResearch. All rights reserved.</p>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900 to-transparent opacity-20"></div>
    </footer>
  );
}