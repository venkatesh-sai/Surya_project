import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { FaEdit, FaEye, FaPlus, FaTrash } from "react-icons/fa";
import { apiClient, toFormData } from "./api";
import { adminModules } from "./config";
import AdminAlert from "./components/AdminAlert";
import AdminButton from "./components/AdminButton";
import AdminModal from "./components/AdminModal";

function createInitialValues(fields) {
  return fields.reduce((values, field) => {
    if (field.type === "checkbox") {
      values[field.name] = field.defaultValue ?? false;
    } else {
      values[field.name] = field.defaultValue ?? "";
    }
    return values;
  }, {});
}

function validate(values, fields, isEditing) {
  const errors = {};

  fields.forEach((field) => {
    const value = values[field.name];
    const isEmpty = field.type === "file" ? !(value instanceof File) : String(value ?? "").trim() === "";

    if ((field.required || (!isEditing && field.requiredOnCreate)) && isEmpty) {
      errors[field.name] = `${field.label} is required.`;
    }

    if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errors[field.name] = "Enter a valid email address.";
    }

    if (field.type === "url" && value) {
      try {
        new URL(value);
      } catch {
        errors[field.name] = "Enter a valid URL.";
      }
    }

    if (field.type === "number" && value !== "" && value !== null) {
      const numberValue = Number(value);
      if (Number.isNaN(numberValue)) {
        errors[field.name] = "Enter a valid number.";
      } else if ((field.min && numberValue < field.min) || (field.max && numberValue > field.max)) {
        errors[field.name] = `${field.label} must be between ${field.min} and ${field.max}.`;
      }
    }
  });

  return errors;
}

function renderValue(item, column) {
  const value = item[column.key];

  if (column.type === "boolean") {
    return <span className={`admin-pill ${value ? "admin-pill-on" : "admin-pill-off"}`}>{value ? "Yes" : "No"}</span>;
  }

  if (value === null || value === undefined || value === "") {
    return "-";
  }

  return String(value).length > 70 ? `${String(value).slice(0, 70)}...` : String(value);
}

function CrudModule({ module }) {
  const [items, setItems] = useState([]);
  const [lookups, setLookups] = useState({});
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [editingItem, setEditingItem] = useState(null);
  const [viewingItem, setViewingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "info" });
  const [loading, setLoading] = useState(true);

  const lookupSources = useMemo(() => {
    if (!module) {
      return [];
    }
    return [...new Set(module.fields.filter((field) => field.source).map((field) => field.source))];
  }, [module]);

  useEffect(() => {
    let mounted = true;

    apiClient.get(`${module.endpoint}/`)
      .then((response) => {
        if (mounted) {
          setItems(response.data);
          setAlert({ message: "", type: "info" });
        }
      })
      .catch(() => {
        if (mounted) {
          setAlert({ message: `Unable to load ${module.label.toLowerCase()}.`, type: "error" });
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    Promise.all(
      lookupSources.map(async (source) => {
        const response = await apiClient.get(`${source}/`);
        return [source, response.data];
      })
    )
      .then((entries) => {
        if (mounted) {
          setLookups(Object.fromEntries(entries));
        }
      })
      .catch(() => {
        if (mounted) {
          setAlert({ message: "Unable to load form options.", type: "error" });
        }
      });

    return () => {
      mounted = false;
    };
  }, [lookupSources, module]);

  async function loadItems() {
    setLoading(true);
    try {
      const response = await apiClient.get(`${module.endpoint}/`);
      setItems(response.data);
      setAlert({ message: "", type: "info" });
    } catch {
      setAlert({ message: `Unable to load ${module.label.toLowerCase()}.`, type: "error" });
    } finally {
      setLoading(false);
    }
  }

  function openCreateForm() {
    setEditingItem(null);
    setValues(createInitialValues(module.fields));
    setErrors({});
    setFormOpen(true);
  }

  function openEditForm(item) {
    const nextValues = createInitialValues(module.fields);

    module.fields.forEach((field) => {
      if (field.type !== "file") {
        nextValues[field.name] = item[field.name] ?? nextValues[field.name];
      }
    });

    setEditingItem(item);
    setValues(nextValues);
    setErrors({});
    setFormOpen(true);
  }

  function updateValue(field, event) {
    const value = field.type === "checkbox"
      ? event.target.checked
      : field.type === "file"
        ? event.target.files?.[0] || ""
        : event.target.value;

    setValues((current) => ({ ...current, [field.name]: value }));
  }

  async function submitForm(event) {
    event.preventDefault();
    const nextErrors = validate(values, module.fields, Boolean(editingItem));

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    try {
      const data = toFormData(values, module.fields);
      if (editingItem) {
        await apiClient.patch(`${module.endpoint}/${editingItem.id}/`, data);
      } else {
        await apiClient.post(`${module.endpoint}/`, data);
      }

      setFormOpen(false);
      setAlert({ message: `${module.label.slice(0, -1) || module.label} saved successfully.`, type: "success" });
      loadItems();
    } catch (error) {
      const responseErrors = error.response?.data;
      setAlert({
        message: responseErrors ? JSON.stringify(responseErrors) : `Unable to save ${module.label.toLowerCase()}.`,
        type: "error",
      });
    }
  }

  async function confirmDelete() {
    try {
      await apiClient.delete(`${module.endpoint}/${deletingItem.id}/`);
      setDeletingItem(null);
      setAlert({ message: "Item deleted successfully.", type: "success" });
      loadItems();
    } catch {
      setAlert({ message: "Unable to delete this item.", type: "error" });
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <span className="admin-kicker">Manage</span>
          <h2>{module.label}</h2>
        </div>
        <AdminButton onClick={openCreateForm}>
          <FaPlus aria-hidden="true" />
          Add {module.label.slice(0, -1)}
        </AdminButton>
      </div>

      <AdminAlert message={alert.message} type={alert.type} />

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              {module.columns.map((column) => <th key={column.key}>{column.label}</th>)}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={module.columns.length + 1}>Loading...</td></tr>
            ) : items.length ? (
              items.map((item) => (
                <tr key={item.id}>
                  {module.columns.map((column) => <td key={column.key}>{renderValue(item, column)}</td>)}
                  <td>
                    <div className="admin-action-row">
                      <AdminButton variant="ghost" onClick={() => setViewingItem(item)}><FaEye aria-hidden="true" />View</AdminButton>
                      <AdminButton variant="ghost" onClick={() => openEditForm(item)}><FaEdit aria-hidden="true" />Edit</AdminButton>
                      <AdminButton variant="danger" onClick={() => setDeletingItem(item)}><FaTrash aria-hidden="true" />Delete</AdminButton>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={module.columns.length + 1}>No records found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {formOpen && (
        <AdminModal title={editingItem ? `Edit ${module.label}` : `Add ${module.label}`} onClose={() => setFormOpen(false)}>
          <form className="admin-form" onSubmit={submitForm}>
            {module.fields.map((field) => (
              <label className={field.type === "checkbox" ? "admin-check" : ""} key={field.name}>
                <span>{field.label}</span>
                {field.type === "textarea" ? (
                  <textarea value={values[field.name] ?? ""} onChange={(event) => updateValue(field, event)} />
                ) : field.type === "select" ? (
                  <select value={values[field.name] ?? ""} onChange={(event) => updateValue(field, event)}>
                    <option value="">Select {field.label}</option>
                    {(field.options || lookups[field.source] || []).map((option) => (
                      <option key={option.value ?? option.id} value={option.value ?? option.id}>
                        {option.label ?? option[field.optionLabel]}
                      </option>
                    ))}
                  </select>
                ) : field.type === "checkbox" ? (
                  <input checked={Boolean(values[field.name])} type="checkbox" onChange={(event) => updateValue(field, event)} />
                ) : (
                  <input
                    accept={field.accept}
                    max={field.max}
                    min={field.min}
                    type={field.type || "text"}
                    onChange={(event) => updateValue(field, event)}
                    value={field.type === "file" ? undefined : values[field.name] ?? ""}
                  />
                )}
                {errors[field.name] && <small>{errors[field.name]}</small>}
              </label>
            ))}
            <div className="admin-form-actions">
              <AdminButton variant="secondary" onClick={() => setFormOpen(false)}>Cancel</AdminButton>
              <AdminButton type="submit">{editingItem ? "Update" : "Create"}</AdminButton>
            </div>
          </form>
        </AdminModal>
      )}

      {viewingItem && (
        <AdminModal title={viewingItem[module.titleField] || "Details"} onClose={() => setViewingItem(null)}>
          <dl className="admin-details">
            {Object.entries(viewingItem).map(([key, value]) => (
              <div key={key}>
                <dt>{key.replaceAll("_", " ")}</dt>
                <dd>{value === null || value === "" ? "-" : String(value)}</dd>
              </div>
            ))}
          </dl>
        </AdminModal>
      )}

      {deletingItem && (
        <AdminModal title="Delete record" onClose={() => setDeletingItem(null)}>
          <p className="admin-delete-copy">Delete {deletingItem[module.titleField] || "this record"}?</p>
          <div className="admin-form-actions">
            <AdminButton variant="secondary" onClick={() => setDeletingItem(null)}>Cancel</AdminButton>
            <AdminButton variant="danger" onClick={confirmDelete}>Delete</AdminButton>
          </div>
        </AdminModal>
      )}
    </div>
  );
}

function CrudPage() {
  const { moduleName } = useParams();
  const module = adminModules[moduleName];

  if (!module) {
    return <div className="admin-page"><AdminAlert message="Unknown admin module." type="error" /></div>;
  }

  return <CrudModule key={moduleName} module={module} />;
}

export default CrudPage;