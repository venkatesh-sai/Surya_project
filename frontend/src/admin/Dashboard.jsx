import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiClient } from "./api";
import { adminModules } from "./config";
import AdminAlert from "./components/AdminAlert";

function Dashboard() {
  const [counts, setCounts] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    Promise.all(
      Object.entries(adminModules).map(async ([key, module]) => {
        const response = await apiClient.get(`${module.endpoint}/`);
        return [key, Array.isArray(response.data) ? response.data.length : 0];
      })
    )
      .then((entries) => {
        if (mounted) {
          setCounts(Object.fromEntries(entries));
        }
      })
      .catch(() => {
        if (mounted) {
          setError("Unable to load dashboard metrics. Check that the Django backend is running.");
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="admin-page">
      <AdminAlert message={error} type="error" />
      <div className="admin-stat-grid">
        {Object.entries(adminModules).map(([key, module]) => (
          <Link className="admin-stat-card" key={key} to={`/admin-panel/${key}`}>
            <span>{module.label}</span>
            <strong>{counts[key] ?? "-"}</strong>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;