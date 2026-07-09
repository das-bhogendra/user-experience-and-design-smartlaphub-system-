import { useMemo, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import AuthShell from "../../pages/AuthShell";

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
  const [showPassword, setShowPassword] = useState(false);

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
    <AuthShell
      title="Create account"
      subtitle="Join SmartLap Hub to get the best deals."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block">
            <div className="text-sm font-medium text-slate-800 mb-1">{nameLabel}</div>
            <input
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              value={form.name}
              autoComplete="name"
            />
          </label>
        </div>

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
                placeholder="Create a password"
                onChange={handleChange}
                value={form.password}
                autoComplete="new-password"
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
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <div className="pt-2 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-semibold text-slate-900 hover:underline"
          >
            Login
          </button>
        </div>
      </form>
    </AuthShell>
  );
};

export default RegisterForm;


