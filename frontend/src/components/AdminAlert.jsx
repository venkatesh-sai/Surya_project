function AdminAlert({ message, type = "info" }) {
  if (!message) {
    return null;
  }

  return <div className={`admin-alert admin-alert-${type}`}>{message}</div>;
}

export default AdminAlert;
