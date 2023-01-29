import React from "react";
import login from "../modules/login";
import useAuthStore from "../store";
import { useRouter } from "next/navigation";

const useSignup = () => {
  const { setUser } = useAuthStore();
  const router = useRouter();

  const [formSubmited, setFormSubmited] = React.useState(false);
  const email = React.useRef<HTMLInputElement>();
  const password = React.useRef<HTMLInputElement>();

  const handleLogin = () => {
    setFormSubmited(true);

    login(email.current!.value, password.current!.value, setUser)
      .then(() => {
        router.push("/");
      })
      .catch(() => {
        setFormSubmited(false);
      });
  };

  return {
    handleLogin,
    email,
    password,
    formSubmited,
  };
};

export default useSignup;
