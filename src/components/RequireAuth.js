import { AppContext } from "../components/AppContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  const context = useContext(AppContext);
  return context.userName !== "" ? children : <Navigate to="/" replace />;
}

export default RequireAuth;
