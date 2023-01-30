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

  const handleLogin = async () => {
    try {
      setFormSubmited(true);
      await login(email.current!.value, password.current!.value, setUser);
      router.push("/");
    } catch (error) {
      const err = error as any;
      setFormSubmited(false);
      const errorCode = err.code;
      const errorMessage = err.message;
      console.error(
        `Something went wrong log in user -> ${errorCode} with ${errorMessage}`
      );
    }
  };

  return {
    handleLogin,
    email,
    password,
    formSubmited,
  };
};

export default useSignup;
