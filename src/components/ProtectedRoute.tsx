import { Navigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";
import type { JSX } from "react";
import { decrypt } from "../utils/crypto";

type ProtectedRouteProps = {
  element: JSX.Element;
};

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const { user } = useUserStore();
  const email = user ? decrypt(user.email) : null;

  if (!user || !email) {
    return <Navigate to="/crypto/" replace />;
  }

  return element;
};

export default ProtectedRoute;
