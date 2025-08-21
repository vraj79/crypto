import { Navigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";
import type { JSX } from "react";

type ProtectedRouteProps = {
  element: JSX.Element;
};

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const { user } = useUserStore();
  const email = user ? atob(user.email) : null;

  if (!user || !email) {
    return <Navigate to="/crypto/" replace />;
  }

  return element;
};

export default ProtectedRoute;
