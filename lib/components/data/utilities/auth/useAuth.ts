import { AuthContext } from "./AuthProvider";
import { useContext } from "react";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth() only available inside an AuthProvider");
  return context;
};
