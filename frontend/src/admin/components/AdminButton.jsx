function AdminButton({ children, variant = "primary", ...props }) {
  return (
    <button className={`admin-btn admin-btn-${variant}`} type="button" {...props}>
      {children}
    </button>
  );
}

export default AdminButton;
