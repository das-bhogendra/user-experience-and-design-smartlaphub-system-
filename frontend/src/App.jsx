import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Home from "./pages/Home";
import Login from "./pages/Login"; // ✅ ADD THIS

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />

      {/* ✅ LOGIN ROUTE */}
      <Route path="/login" element={<Login />} />

    </Routes>
  );
};

export default App;