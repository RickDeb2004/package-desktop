import { getDatabase, ref, push, onValue } from "firebase/database";
import { app } from "../firebase";

const db = getDatabase(app);

export const getArticles = (callback) => {
  onValue(ref(db, "articles"), (snapshot) => {
    const data = snapshot.val();
    // console.log(data)
    callback(data);
  });
};
