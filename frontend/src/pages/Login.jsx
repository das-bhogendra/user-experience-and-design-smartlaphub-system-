import React, { useEffect, useState } from "react";
import { useShop } from "../contexts/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [mode, setMode] = useState("login"); // login | register

  const { token, navigate, backendUrl, setToken } = useShop();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // =========================
  // SUBMIT HANDLER
  // =========================
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    console.log("LOGIN CLICKED");
    console.log("MODE:", mode);
    console.log("BACKEND URL:", backendUrl);

    try {
      const url =
        mode === "register"
          ? `${backendUrl}/api/user/register`
          : `${backendUrl}/api/user/login`;

      const payload =
        mode === "register"
          ? { name, email, password }
          : { email, password };

      console.log("REQUEST URL:", url);
      console.log("REQUEST PAYLOAD:", payload);

      const { data } = await axios.post(url, payload);
      console.log("SUCCESS:", data.success);
      console.log("TOKEN:", data.token);

      

      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);

        toast.success(
          mode === "login"
            ? "Login successful"
            : "Account created successfully"
        );

        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("LOGIN ERROR:", error);
      console.log("ERROR RESPONSE:", error.response?.data);

      toast.error(error.response?.data?.message || error.message);
    }
  };

  // =========================
  // AUTO REDIRECT IF LOGGED IN
  // =========================
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      {/* TITLE */}
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="text-3xl font-semibold">
          {mode === "login" ? "Login" : "Sign Up"}
        </p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {/* NAME (REGISTER ONLY) */}
      {mode === "register" && (
        <input
          className="w-full px-3 py-2 border border-gray-800"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      )}

      {/* EMAIL */}
      <input
        className="w-full px-3 py-2 border border-gray-800"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* PASSWORD */}
      <input
        className="w-full px-3 py-2 border border-gray-800"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {/* SWITCH MODE */}
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot Password?</p>

        {mode === "login" ? (
          <p
            onClick={() => setMode("register")}
            className="cursor-pointer text-blue-600"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setMode("login")}
            className="cursor-pointer text-blue-600"
          >
            Login here
          </p>
        )}
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        className="bg-black text-white font-light px-8 py-2 mt-4"
      >
        {mode === "login" ? "Login" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
