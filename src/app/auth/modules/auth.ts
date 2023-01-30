import { MyUser } from "@/app/auth/store";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "@/database/config";

type Params = {
  setUser: (user: MyUser) => void;
  onUser: () => void;
  onNoUser: () => void;
};

export default async function onUserStateChange({
  onNoUser,
  onUser,
  setUser,
}: Params) {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      const docRef = doc(db, "users", uid);

      const userSnap = await getDoc(docRef);

      const userData = userSnap.data() as MyUser;

      setUser({ ...userData });
      onUser();
    } else {
      onNoUser();
    }
  });
}
