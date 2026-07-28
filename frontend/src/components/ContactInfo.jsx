import React from "react";

const ContactInfo = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>

      <div className="space-y-3 text-gray-700">
        <p>
          <span className="font-semibold">Company Name:</span> SmartLap Hub
        </p>
        <p>
          <span className="font-semibold">Support Email:</span> support@smartlaphub.com
        </p>
        <p>
          <span className="font-semibold">Phone:</span> +1 (555) 123-4567
        </p>
        <p>
          <span className="font-semibold">Address:</span> 123 Market Street, Tech City
        </p>
        <p>
          <span className="font-semibold">Business Hours:</span> Mon - Fri, 9:00 AM - 6:00 PM
        </p>
      </div>

      <div className="mt-6 text-sm text-gray-500">
        We typically respond within 24–48 hours.
      </div>
    </div>
  );
};

export default ContactInfo;


