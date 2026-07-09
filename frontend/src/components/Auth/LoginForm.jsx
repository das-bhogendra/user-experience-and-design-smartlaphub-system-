import { useMemo, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import AuthShell from "../../pages/AuthShell";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
      const res = await login(form);

      // Some implementations return {success:false, message:...} without throwing.
      // In that case, surface the backend message.
      if (res?.success === false || !res?.token) {
        setError(res?.message || "Invalid email or password.");
        return;
      }

      navigate("/");
    } catch (err) {
      // Always surface backend-provided message (e.g. "Invalid email or password.")
      // but keep a safe fallback.
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Invalid email or password.";
      setError(msg);
    } finally {
      setLoading(false);
    }


  };

  return (
    <AuthShell title="Login" subtitle="Welcome back. Let’s get you shopping!">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block">
            <div className="text-sm font-medium text-slate-800 mb-1">{emailLabel}</div>
            <input
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              value={form.email}
              autoComplete="email"
            />
          </label>
        </div>

        <div className="space-y-2">
          <label className="block">
            <div className="text-sm font-medium text-slate-800 mb-1">{passwordLabel}</div>
            <div className="relative">
              <input
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                onChange={handleChange}
                value={form.password}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>
        </div>

        {error ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-slate-900 px-4 py-3 text-white font-semibold tracking-wide transition hover:bg-slate-800 disabled:opacity-60 disabled:hover:bg-slate-900"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="pt-2 text-center text-sm text-slate-600">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="font-semibold text-slate-900 hover:underline"
          >
            Register
          </button>
        </div>
      </form>
    </AuthShell>
  );
};

export default LoginForm;


