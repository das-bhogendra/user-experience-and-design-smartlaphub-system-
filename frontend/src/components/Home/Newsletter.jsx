const Newsletter = () => {
  return (
    <section className="bg-slate-900 py-20">
      <div className="max-w-3xl mx-auto text-center px-6">

        <h2 className="text-4xl font-bold text-white">
          Subscribe To Our Newsletter
        </h2>

        <p className="text-gray-400 mt-4">
          Receive updates, offers, and new product announcements.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mt-8">

          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-5 py-4 rounded-xl outline-none"
          />

          <button className="bg-yellow-400 px-8 py-4 rounded-xl font-semibold">
            Subscribe
          </button>

        </div>
      </div>
    </section>
  );
};

export default Newsletter;