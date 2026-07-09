import React from "react";
import ContactForm from "../components/ContactForm";
import ContactInfo from "../components/ContactInfo";

const Contact = () => {
  return (
    <div className="w-full bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black mb-2">
          Contact Us
        </h1>
        <p className="text-gray-600 mb-8">
          Reach out to SmartLap Hub for support, partnerships, or any questions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </div>
  );
};

export default Contact;

