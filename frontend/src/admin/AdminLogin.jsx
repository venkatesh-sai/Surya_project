import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import AdminAlert from "./components/AdminAlert";
import AdminButton from "./components/AdminButton";
import { useAdminAuth } from "./authContext";

function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, login } = useAdminAuth();
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const destination = location.state?.from?.pathname || "/admin-panel";

  if (!loading && user) {
    return <Navigate to={destination} replace />;
  }

  function validate() {
    const nextErrors = {};
    if (!values.email.trim()) {
      nextErrors.email = "Email required";
    }
    if (!values.password) {
      nextErrors.password = "Password required";
    }
    return nextErrors;
  }

  async function submitLogin(event) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    setAlert("");

    if (Object.keys(nextErrors).length) {
      return;
    }

    setSubmitting(true);
    try {
      await login(values.email, values.password);
      navigate(destination, { replace: true });
    } catch (error) {
      const data = error.response?.data;
      if (data?.errors) {
        setErrors(data.errors);
      }
      setAlert(data?.detail || "Invalid login");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="admin-login-page">
      <form className="admin-login-card" onSubmit={submitLogin}>
        <div>
          <span className="admin-kicker">Admin Login</span>
          <h1>Surya Admin Panel</h1>
        </div>

        <AdminAlert message={alert} type="error" />

        <label>
          <span>Email / Gmail</span>
          <input
            autoComplete="email"
            type="email"
            value={values.email}
            onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
          />
          {errors.email && <small>{errors.email}</small>}
        </label>

        <label>
          <span>Password</span>
          <input
            autoComplete="current-password"
            type="password"
            value={values.password}
            onChange={(event) => setValues((current) => ({ ...current, password: event.target.value }))}
          />
          {errors.password && <small>{errors.password}</small>}
        </label>

        <AdminButton type="submit" disabled={submitting}>
          {submitting ? "Signing in..." : "Login"}
        </AdminButton>
      </form>
    </section>
  );
}

export default AdminLogin;