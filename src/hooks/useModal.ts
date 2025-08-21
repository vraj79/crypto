import { useState } from "react";

const useModal = () => {
  const [modal, setModal] = useState<{ show: boolean; error: string }>({
    show: false,
    error: "",
  });

  const open = () => setModal((m) => ({ ...m, show: true }));
  const close = () => setModal((m) => ({ ...m, show: false, error: "" }));
  const setError = (error: string) => setModal((m) => ({ ...m, error }));

  return { modal, open, close, setError };
};

export default useModal;
