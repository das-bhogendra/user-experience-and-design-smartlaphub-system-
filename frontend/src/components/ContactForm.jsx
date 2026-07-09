import React, { useState } from "react";
import api from "../services/api";

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const nextErrors = {};
    const name = formData.name.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    if (!name) nextErrors.name = "Name is required.";
    if (!email) nextErrors.email = "Email is required.";
    else if (!isValidEmail(email)) nextErrors.email = "Please provide a valid email.";

    if (!subject) nextErrors.subject = "Subject is required.";
    if (!message) nextErrors.message = "Message is required.";

    return nextErrors;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field as user types
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setSuccess("");
  };

  const submit = async (e) => {
    e.preventDefault();

    const nextErrors = validate();
    const hasErrors = Object.values(nextErrors).some(Boolean);
    if (hasErrors) {
      setErrors(nextErrors);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      };

      const response = await api.post("/contact", payload);

      if (response.data?.success) {
        setSuccess(response.data.message || "Message sent successfully.");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrors({});
      } else {
        setSuccess("");
        setErrors({ form: response.data?.message || "Failed to submit." });
      }
    } catch (err) {
      setSuccess("");
      setErrors({ form: err?.message || "Failed to submit." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Contact Us</h2>

      {success ? (
        <div className="mb-4 p-3 rounded-md bg-green-50 text-green-700 text-sm border border-green-200">
          {success}
        </div>
      ) : null}

      {errors.form ? (
        <div className="mb-4 p-3 rounded-md bg-red-50 text-red-700 text-sm border border-red-200">
          {errors.form}
        </div>
      ) : null}

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your name"
          />
          {errors.name ? <p className="text-sm text-red-600 mt-1">{errors.name}</p> : null}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
          />
          {errors.email ? <p className="text-sm text-red-600 mt-1">{errors.email}</p> : null}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <input
            name="subject"
            value={formData.subject}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="How can we help?"
          />
          {errors.subject ? <p className="text-sm text-red-600 mt-1">{errors.subject}</p> : null}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={onChange}
            rows={5}
            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Write your message..."
          />
          {errors.message ? <p className="text-sm text-red-600 mt-1">{errors.message}</p> : null}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-blue-600 text-white py-2.5 font-semibold hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;

