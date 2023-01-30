import { auth } from "@/database/config";
import { signOut } from "firebase/auth";
import { MyUser } from "@/app/auth/store";

export const logout = async (setUser: (user?: MyUser) => void) => {
  await signOut(auth);
  setUser(undefined);
};

export default logout;
