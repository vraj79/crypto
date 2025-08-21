import React from "react";
import { useNavigate } from "react-router-dom";
import type { TLoginForm, TPageType } from "../types/types";
import useAuth from "../hooks/useAuth";
import useModal from "../hooks/useModal";
import InputField from "./InputField";
import Button from "./Button";

const Navbar: React.FC = () => {
  const [activePage, setActivePage] = React.useState<TPageType>("home");
  const [loginForm, setLoginForm] = React.useState<TLoginForm>({
    email: "",
    password: "",
  });

  const { email, handleLogin, handleLogout, isAuthenticated } = useAuth();
  const { modal, open, close, setError } = useModal();
  const navigate = useNavigate();

  const handleNavClick = (page: TPageType) => {
    if (page === "trade" && !isAuthenticated) {
      open();
      return;
    }
    setActivePage(page);
    navigate(page === "home" ? "/crypto/" : `/crypto/${page}`);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(
      loginForm,
      () => {
        close();
        setActivePage("trade");
      },
      (msg) => setError(msg)
    );
  };

  return (
    <>
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between bg-neutral-900 px-8 text-white">
        <nav className="flex gap-6">
          <Button
            onClick={() => handleNavClick("home")}
            variant="ghost"
            className={`text-base ${
              activePage === "home"
                ? "text-sky-400 font-bold"
                : "text-white font-normal"
            }`}
          >
            Home
          </Button>

          <Button
            onClick={() => handleNavClick("trade")}
            variant="ghost"
            className={`text-base ${
              activePage === "trade"
                ? "text-sky-400 font-bold"
                : "text-white font-normal"
            }`}
          >
            Trade
          </Button>
        </nav>

        <div>
          <div>
            {isAuthenticated ? (
              <>
                <span className="mr-4">{email}</span>
                <Button onClick={handleLogout} variant="danger">
                  Log Out
                </Button>
              </>
            ) : (
              <Button onClick={open} variant="primary">
                Log In
              </Button>
            )}
          </div>
        </div>
      </header>

      {modal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <form
            onSubmit={handleLoginSubmit}
            className="flex min-w-[400px] flex-col gap-4 rounded-lg bg-white p-8 shadow-lg"
          >
            <h2 className="text-xl font-bold text-neutral-900">Log In</h2>

            <InputField
              label="Email"
              type="email"
              value={loginForm.email}
              onChange={(e) =>
                setLoginForm({ ...loginForm, email: e.target.value })
              }
              placeholder="Enter your email"
            />

            <InputField
              label="Password"
              type="password"
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
              placeholder="Enter your password"
            />

            {modal.error && (
              <p className="text-sm text-red-500">{modal.error}</p>
            )}
            <div className="flex justify-end gap-2">
              <Button type="button" onClick={close} variant="secondary">
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Log In
              </Button>
            </div>
          </form>
        </div>
      )}
      <main className="p-4"></main>
    </>
  );
};

export default Navbar;
