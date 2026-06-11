import { useMemo, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const emailLabel = useMemo(() => "Email", []);
  const passwordLabel = useMemo(() => "Password", []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // basic validation
    if (!form.email || !form.password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      await login(form);
      navigate("/");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "0 auto" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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
              placeholder="Enter your password"
              onChange={handleChange}
              value={form.password}
              autoComplete="current-password"
            />
          </label>

          {error ? (
            <div style={{ color: "crimson", fontSize: 14 }}>{error}</div>
          ) : null}

          <button type="submit" disabled={loading} style={{ marginTop: 8 }}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <div style={{ marginTop: 14, fontSize: 14 }}>
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              style={{
                border: "none",
                background: "transparent",
                padding: 0,
                color: "#2563eb",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

