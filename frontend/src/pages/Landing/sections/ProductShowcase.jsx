import landing1 from "../../../assets/images/landing/landing1.png";

const ProductShowcaseSection = () => {
  return (
    <section className="bg-[#F5F7FC] py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Left Card */}
          <div className="lg:col-span-2 bg-[#EEF3FF] rounded-2xl p-8">
            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
              New Arrival
            </span>

            <h2 className="text-4xl font-bold mt-4">
              SmartLap Elite X1
            </h2>

            <p className="text-gray-600 mt-3 max-w-lg">
              Equipped with the latest neural processing units
              for AI-driven productivity and creative workflows.
            </p>

            <img
              src={landing1}
              alt="Laptop"
              className="mt-10 w-full max-w-lg mx-auto"
            />
          </div>

          {/* Right Cards */}
          <div className="flex flex-col gap-6">

            <div className="bg-[#061A3D] text-white rounded-2xl p-8 flex-1">
              <h3 className="text-2xl font-bold mb-3">
                Hyper-Speed CPU
              </h3>

              <p className="text-gray-300">
                Up to 6.2GHz turbo boost for
                ultimate efficiency.
              </p>
            </div>

            <div className="bg-[#DCE8FF] rounded-2xl p-8 flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Pro-Grade Retina
              </h3>

              <p className="text-gray-600">
                120Hz Liquid Crystal display with
                100% DCI-P3 coverage.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcaseSection;