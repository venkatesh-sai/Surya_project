import { NavLink, Outlet } from "react-router-dom";
import { FaBars, FaBoxOpen, FaBuilding, FaChartLine, FaLayerGroup, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "./AdminAuthContext";
import { adminNav } from "./AdminConfig";

const icons = {
  Dashboard: FaChartLine,
  Brands: FaBuilding,
  Categories: FaLayerGroup,
  Products: FaBoxOpen,
  Locations: FaMapMarkerAlt,
};

function AdminLayout() {
  const navigate = useNavigate();
  const { logout, user } = useAdminAuth();

  async function handleLogout() {
    try {
      await logout();
    } finally {
      navigate("/admin-panel/login", { replace: true });
    }
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <strong>Surya Admin</strong>
          <span>Operations</span>
        </div>
        <nav className="admin-nav" aria-label="Admin navigation">
          {adminNav.map((item) => {
            const Icon = icons[item.label] || FaBars;
            return (
              <NavLink key={item.path} to={item.path} end>
                <Icon aria-hidden="true" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
      <section className="admin-main">
        <header className="admin-topbar">
          <div>
            <span className="admin-kicker">Admin Panel</span>
            <h1>Dashboard</h1>
          </div>
          <div className="admin-topbar-actions">
            <span className="admin-user-email">{user?.email || user?.username}</span>
            <a className="admin-view-site" href="/">View Site</a>
            <button className="admin-btn admin-btn-secondary" type="button" onClick={handleLogout}>Logout</button>
          </div>
        </header>
        <Outlet />
      </section>
    </div>
  );
}

export default AdminLayout;
