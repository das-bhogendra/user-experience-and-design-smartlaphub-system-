const Testimonials = () => {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          What Our Customers Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-12">

          <div className="bg-white p-8 rounded-2xl shadow">
            <p>
              Excellent product quality and very fast shipping.
            </p>
            <h4 className="font-semibold mt-4">
              John Smith
            </h4>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow">
            <p>
              One of the best online shopping experiences.
            </p>
            <h4 className="font-semibold mt-4">
              Sarah Johnson
            </h4>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow">
            <p>
              Great support team and amazing collection.
            </p>
            <h4 className="font-semibold mt-4">
              Michael Brown
            </h4>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;