import { createContext, useContext } from "react";

export const AuthContext = createContext(null);

export function useAdminAuth() {
  return useContext(AuthContext);
}
