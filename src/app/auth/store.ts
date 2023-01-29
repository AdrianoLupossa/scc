import { create } from "zustand";
import { User } from "firebase/auth";

export type MyUser = {
  uid?: string;
  email: string;
  password?: string;
  fullName: string;
  phoneNumber: string;
};

type Store = {
  user?: MyUser;
  setUser: (user: MyUser) => void;
};

const useAuthStore = create<Store>((set) => ({
  user: undefined,
  setUser: (user) => set({ user }),
}));

export default useAuthStore;
