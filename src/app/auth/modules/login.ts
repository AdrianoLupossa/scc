import { signInWithEmailAndPassword, User } from "firebase/auth";
import { auth, db } from "@/database/config";

import { z } from "zod";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { MyUser } from "../store";

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().trim().min(1),
});

export default async function login(
  email: string,
  password: string,
  setUser: (user: MyUser) => void
) {
  signinSchema.parse({ email, password });

  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  if (userCredential) {
    const user = userCredential.user;
    const docRef = doc(db, "users", user.uid);

    const userSnap = await getDoc(docRef);

    const userData = userSnap.data() as MyUser;

    setUser({ ...userData });
  }
}
