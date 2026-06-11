import { useMemo, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const nameLabel = useMemo(() => "Full Name", []);
  const emailLabel = useMemo(() => "Email", []);
  const passwordLabel = useMemo(() => "Password", []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      await register(form);
      navigate("/login");
    } catch (err) {
      // Try to show backend error message if available
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Registration failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }

  };

  return (
    <div style={{ maxWidth: 420, margin: "0 auto" }}>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <label>
            <div>{nameLabel}</div>
            <input
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              value={form.name}
              autoComplete="name"
            />
          </label>

          <label>
            <div>{emailLabel}</div>
            <input
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              value={form.email}
              autoComplete="email"
            />
          </label>

          <label>
            <div>{passwordLabel}</div>
            <input
              name="password"
              type="password"
              placeholder="Create a password"
              onChange={handleChange}
              value={form.password}
              autoComplete="new-password"
            />
          </label>

          {error ? (
            <div style={{ color: "crimson", fontSize: 14 }}>{error}</div>
          ) : null}

          <button type="submit" disabled={loading} style={{ marginTop: 8 }}>
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <div style={{ marginTop: 14, fontSize: 14 }}>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              style={{
                border: "none",
                background: "transparent",
                padding: 0,
                color: "#2563eb",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;

