import { useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";
import type { TLoginForm } from "../types/types";

const useAuth = () => {
  const { user, login, logout } = useUserStore();
  const navigate = useNavigate();

  const email = user ? atob(user.email) : null;

  const handleLogin = (
    form: TLoginForm,
    onSuccess: () => void,
    onError: (msg: string) => void
  ) => {
    if (!form.email.includes("@") || form.password.length < 4) {
      onError("Invalid email or password (min 4 chars)");
      return;
    }
    login(form.email);
    onSuccess();
    navigate("/crypto/trade");
  };

  const handleLogout = () => {
    logout();
    navigate("/crypto/");
  };

  return { email, handleLogin, handleLogout, isAuthenticated: !!user };
};

export default useAuth;
