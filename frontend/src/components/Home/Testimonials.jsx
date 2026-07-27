import { Star } from "lucide-react";

const testimonials = [
  {
    name: "John Smith",
    review: "Excellent product quality and very fast shipping.",
    rating: 5,
  },
  {
    name: "Sarah Johnson",
    review: "One of the best online shopping experiences.",
    rating: 5,
  },
  {
    name: "Michael Brown",
    review: "Great support team and amazing collection.",
    rating: 4,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900">
          What Our Customers Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300"
            >
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(item.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Review */}
              <p className="text-gray-600 leading-relaxed">{item.review}</p>

              {/* Customer Name */}
              <h4 className="font-semibold mt-6 text-gray-900">
                {item.name}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;