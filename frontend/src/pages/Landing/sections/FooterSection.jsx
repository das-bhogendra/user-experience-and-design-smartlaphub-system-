import React from "react";

const FooterSection = () => {
  return (
    <footer className="bg-[#EFF4FF]">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-black">
              SmartLap Hub
            </h2>

            <p className="mt-4 text-[#4A4A4A] leading-7">
              Discover premium laptops, accessories, and modern technology
              solutions designed to enhance your productivity and digital
              lifestyle.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-black mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-[#3F3F46] hover:text-black transition"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-[#3F3F46] hover:text-black transition"
                >
                  Products
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-[#3F3F46] hover:text-black transition"
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-[#3F3F46] hover:text-black transition"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-black mb-5">
              Support
            </h3>

            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-[#3F3F46] hover:text-black transition"
                >
                  FAQ
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-[#3F3F46] hover:text-black transition"
                >
                  Shipping Policy
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-[#3F3F46] hover:text-black transition"
                >
                  Return Policy
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-[#3F3F46] hover:text-black transition"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-black mb-5">
              Contact
            </h3>

            <div className="space-y-3 text-[#4A4A4A]">
              <p>Kathmandu, Nepal</p>
              <p>support@smartlaphub.com</p>
              <p>+977 98XXXXXXXX</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 mt-12 pt-6 text-center">
          <p className="text-[#4A4A4A] text-sm">
            © {new Date().getFullYear()} SmartLap Hub. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default FooterSection;