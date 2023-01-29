import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";

import { auth, db } from "@/database/config";

import { MyUser } from "../store";

import { z } from "zod";
import { doc, setDoc } from "firebase/firestore";

const registerSchema = z.object({
  fullName: z.string().trim().min(1),
  email: z.string().email(),
  phoneNumber: z.string().trim().min(1),
  password: z.string().trim().min(1),
});

// export type RegisterSchemaType = z.infer<typeof registerSchema>;

export default async function register(
  fullName: string,
  email: string,
  phoneNumber: string,
  password: string,
  setUserData: (user: MyUser) => void
) {
  registerSchema.parse({ fullName, email, phoneNumber, password });

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential: UserCredential) => {
      // Signed in
      const user = userCredential.user;
      setUserData({ uid: user.uid, fullName, email, phoneNumber });

      await setDoc(doc(db, "users", user.uid), {
        fullName,
        uid: user.uid,
        email: user.email,
        phoneNumber,
      });

      return 200;
    })
    .catch((error: any) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(
        `Something went wrong registering user -> ${errorCode} with ${errorMessage}`
      );
    });
}
