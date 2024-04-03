import { getDatabase, ref, push, onValue } from "firebase/database";
import { firebaseApp } from "../firebase";

const db = getDatabase(firebaseApp);

export const getArticles = (callback) => {
  onValue(ref(db, "articles"), (snapshot) => {
    const data = snapshot.val();
    // console.log(data)
    callback(data);
  });
};
