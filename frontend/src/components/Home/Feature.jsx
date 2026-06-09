import {
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

const Feature = () => {
  const features = [
    {
      icon: <Truck size={35} />,
      title: "Free Shipping",
      description: "Free delivery on all orders above $100.",
    },
    {
      icon: <ShieldCheck size={35} />,
      title: "Secure Payment",
      description: "100% protected payment methods.",
    },
    {
      icon: <RotateCcw size={35} />,
      title: "Easy Returns",
      description: "30 days return guarantee.",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border rounded-2xl p-8 shadow-sm hover:shadow-lg transition"
            >
              <div className="text-indigo-600">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold mt-4">
                {feature.title}
              </h3>

              <p className="text-gray-500 mt-2">
                {feature.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Feature;