import { create } from "zustand";
import { z } from "zod";

export const userSchema = z.object({
  uid: z.string().optional(),
  email: z.string(),
  password: z.string().optional(),
  fullName: z.string(),
  phoneNumber: z.string(),
});

export type MyUser = z.infer<typeof userSchema>;

type Store = {
  user?: MyUser;
  setUser: (user?: MyUser) => void;
};

const useAuthStore = create<Store>((set) => ({
  user: undefined,
  setUser: (user) => {
    const s = userSchema.safeParse(user);
    if (!s.success) {
      console.error("Invalid user", s.error);
      return;
    }
    set({ user });
  },
}));

export default useAuthStore;
