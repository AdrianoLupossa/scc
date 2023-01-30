import React from "react";
import register from "../modules/register";
import useAuthStore from "../store";
import { useRouter } from "next/navigation";

// import { Container } from './styles';

const useSignup = () => {
  const { setUser } = useAuthStore();
  const router = useRouter();

  const [formSubmited, setFormSubmited] = React.useState(false);
  const fullName = React.useRef<HTMLInputElement>();
  const email = React.useRef<HTMLInputElement>();
  const phoneNumber = React.useRef<HTMLInputElement>();
  const password = React.useRef<HTMLInputElement>();

  const handleRegister = () => {
    setFormSubmited(true);

    register(
      fullName.current!.value,
      email.current!.value,
      phoneNumber.current!.value,
      password.current!.value,
      setUser
    )
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(
          `Something went wrong registering user -> ${errorCode} with ${errorMessage}`
        );
        throw Error(`Something went wrong -> ${errorMessage}`);
      });
  };

  return {
    handleRegister,
    fullName,
    email,
    phoneNumber,
    password,
    formSubmited,
  };
};

export default useSignup;
