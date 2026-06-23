import AdminButton from "./AdminButton";

function AdminModal({ title, children, onClose }) {
  return (
    <div className="admin-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div className="admin-modal" role="dialog" aria-modal="true" aria-label={title} onMouseDown={(event) => event.stopPropagation()}>
        <div className="admin-modal-header">
          <h2>{title}</h2>
          <AdminButton variant="ghost" onClick={onClose}>Close</AdminButton>
        </div>
        {children}
      </div>
    </div>
  );
}

export default AdminModal;
