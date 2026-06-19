import { useEffect, useMemo, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { apiClient } from "./api";
import { AuthContext, useAdminAuth } from "./authContext";

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function refreshUser() {
    try {
      const response = await apiClient.get("me/");
      setUser(response.data.user);
      return response.data.user;
    } catch {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function login(email, password) {
    const response = await apiClient.post("login/", { email, password });
    setUser(response.data.user);
    return response.data.user;
  }

  async function logout() {
    await apiClient.post("logout/");
    setUser(null);
  }

  useEffect(() => {
    let mounted = true;

    apiClient.get("me/")
      .then((response) => {
        if (mounted) {
          setUser(response.data.user);
        }
      })
      .catch(() => {
        if (mounted) {
          setUser(null);
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    login,
    logout,
    refreshUser,
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function ProtectedAdminRoute() {
  const location = useLocation();
  const { user, loading } = useAdminAuth();

  if (loading) {
    return <div className="admin-auth-loading">Checking admin session...</div>;
  }

  if (!user) {
    return <Navigate to="/admin-login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}