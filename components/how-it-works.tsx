"use client";

export function HowItWorks() {
  const steps = [
    { title: "Input Your Topic", description: "Provide the research topic or question you want to explore" },
    { title: "AI Agents Activate", description: "Our CrewAI Agents spring into action, collaborating to tackle your research" },
    { title: "Comprehensive Research", description: "Agents search the internet, analyze data, and generate insights" },
    { title: "Results Delivered", description: "Receive a detailed report with findings, analysis, and actionable insights" },
  ];

  return (
    <section
      id="how-it-works"
      className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
          How It Works
        </h2>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500 to-blue-500"></div>
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center mb-12 ${index % 2 === 0 ? "flex-row-reverse" : ""}`}
            >
              <div className="w-1/2"></div>
              <div className="w-12 h-12 bg-purple-500 rounded-full z-10 flex items-center justify-center text-2xl font-bold">
                {index + 1}
              </div>
              <div className={`w-1/2 p-6 bg-gray-800 rounded-xl shadow-lg ${index % 2 === 0 ? "mr-8" : "ml-8"} relative overflow-hidden group`}>
                <h3 className="text-xl font-semibold mb-2 relative z-10">{step.title}</h3>
                <p className="text-gray-400 relative z-10">{step.description}</p>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
    </section>
  );
}