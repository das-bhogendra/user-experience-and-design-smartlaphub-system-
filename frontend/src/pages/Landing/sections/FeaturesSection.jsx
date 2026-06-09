import React from "react";

import {
  ShieldCheck,
  Leaf,
  Cpu,
  Headphones
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <ShieldCheck size={40} />,
      title: "Verified Reliability",
      desc: "20,000+ hours of rigorous stress testing.",
    },
    {
      icon: <Leaf size={40} />,
      title: "Sustainably Sourced",
      desc: "100% recycled aluminum chassis.",
    },
    {
      icon: <Cpu size={40} />,
      title: "Modular RAM",
      desc: "Easily upgradeable memory slots.",
    },
    {
      icon: <Headphones size={40} />,
      title: "Pro Support",
      desc: "24/7 dedicated enterprise assistance.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">
          <div className="w-10 h-1 bg-pink-500 mx-auto mb-8"></div>

          <h2 className="text-5xl font-bold">
            Unmatched Engineering
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Every component is curated for longevity and
            peak performance under sustained professional workloads.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mt-20">

          {features.map((item, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center text-blue-600 mb-5">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;