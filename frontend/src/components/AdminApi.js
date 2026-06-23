import axios from "axios";

export const apiClient = axios.create({
  baseURL: "/api/admin",
  withCredentials: true,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
});

export function toFormData(values, fields) {
  const formData = new FormData();

  fields.forEach((field) => {
    const value = values[field.name];

    if (field.type === "file" && field.multiple) {
      if (Array.isArray(value)) {
        value.forEach((file) => {
          if (file instanceof File) {
            formData.append(field.name, file);
          }
        });
      }
      return;
    }

    if (field.type === "file") {
      if (value instanceof File) {
        formData.append(field.name, value);
      }
      return;
    }

    if (field.type === "checkbox") {
      formData.append(field.name, value ? "true" : "false");
      return;
    }

    if (field.type === "number" && value === "") {
      return;
    }

    if (value !== undefined && value !== null) {
      formData.append(field.name, value);
    }
  });

  return formData;
}
