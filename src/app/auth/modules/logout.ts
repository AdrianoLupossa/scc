import { auth } from "@/database/config";
import { signOut, User } from "firebase/auth";

export const logout = async (setUser: (user?: User) => void) => {
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
