import Contact from "../models/contactModel.js";

const isValidEmail = (email) => {
  // Simple, practical email validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body || {};

    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim() : "";
    const trimmedSubject = typeof subject === "string" ? subject.trim() : "";
    const trimmedMessage = typeof message === "string" ? message.trim() : "";

    if (!trimmedName || !trimmedEmail || !trimmedSubject || !trimmedMessage) {
      return res.json({
        success: false,
        message: "All fields (name, email, subject, message) are required.",
      });
    }

    if (!isValidEmail(trimmedEmail)) {
      return res.json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    const contact = new Contact({
      name: trimmedName,
      email: trimmedEmail,
      subject: trimmedSubject,
      message: trimmedMessage,
    });

    await contact.save();

    return res.json({
      success: true,
      message: "Your message has been submitted successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.json({ success: true, contacts });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.json({ success: false, message: "Contact id is required." });
    }

    await Contact.findByIdAndDelete(id);
    return res.json({ success: true, message: "Contact message deleted." });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.json({ success: false, message: "Contact id is required." });
    }

    const updated = await Contact.findByIdAndUpdate(
      id,
      { status: "Read" },
      { new: true }
    );

    if (!updated) {
      return res.json({ success: false, message: "Contact message not found." });
    }

    return res.json({ success: true, message: "Marked as read." });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export { submitContact, getAllContacts, deleteContact, markAsRead };

