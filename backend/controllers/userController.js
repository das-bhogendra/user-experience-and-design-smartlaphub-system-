import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const loginUser = async (req, res) => {
  try {
    console.log("LOGIN API HIT");
    console.log("LOGIN REQUEST BODY:", req.body);

    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    console.log("LOGIN EMAIL:", email);
    console.log("USER FOUND:", user);

    if (!user) {
      return res.json({
        success: false,
        message: "User doesn't exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = createToken(user._id);

    console.log("LOGIN GENERATED TOKEN:", token);

    console.log("LOGIN RESPONSE BEFORE JSON:", {
      success: true,
      token,
      message: "Login successful",
    });

    return res.json({
      success: true,
      token,
      message: "Login successful",
    });

  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// Route for userRegistration
const registerUser = async (req, res) => {
  try {
    console.log("REGISTER HIT");
    console.log("REGISTER REQUEST BODY:", req.body);
    const { name, email, password } = req.body;

    console.log("REGISTER PARSED:", { name, email, password });

    // checking if user already exists or not
    // NOTE: debug duplicate checks
    let exist;
    try {
      exist = await userModel.findOne({ email });
      console.log("REGISTER EXIST RESULT:", exist);
    } catch (err) {
      console.log("REGISTER findOne ERROR:", err);
      return res.json({ success: false, message: err.message || "findOne failed" });
    }

    if (exist) {
      return res.json({ success: false, message: "User already exists" });
    }

    // validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be atleast 8 characters long",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // creating user
    const newUser = new userModel({ name, email, password: hashedPassword });
    console.log("USER BEFORE SAVE:", newUser);
    const user = await newUser.save();
    console.log("REGISTER SAVED USER:", user);

    // generating token
    const token = createToken(user._id);
    console.log("REGISTER GENERATED TOKEN:", token);

    console.log("REGISTER RESPONSE BEFORE JSON:", { success: true, token, message: "Register successful" });

    res.json({
      success: true,
      token,
      message: "Register successful",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Route for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);

      res.json({ success: true, token });
    } else {
      res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { loginUser, registerUser, adminLogin };
