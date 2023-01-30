import { auth } from "@/database/config";
import { signOut } from "firebase/auth";
import { MyUser } from "@/app/auth/store";

export const logout = async (setUser: (user?: MyUser) => void) => {
  signOut(auth)
    .then(() => {
      setUser(undefined);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(
        `Something went wrong log out user -> ${errorCode} with ${errorMessage}`
      );
    });
};

export default logout;
