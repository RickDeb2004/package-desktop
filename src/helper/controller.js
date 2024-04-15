import { getDatabase, ref, push, onValue } from "firebase/database";
import { app } from "../firebase";

const db = getDatabase(app);

export const getArticles = (callback) => {
  onValue(ref(db, "articles"), (snapshot) => {
    const data = snapshot.val();
   
    callback(data);
  });
};

export const getAdminData = (callback) => {
  onValue(ref(db, "admin"), (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
}

// export const addCategory = (category) => {
//   push(ref(db, "categories"), category);
// };

// export const getCategories = (callback) => {
//   onValue(ref(db, "categories"), (snapshot) => {
//     const data = snapshot.val();
//     callback(data);
//   });
// };

export const getArticleCategories = (callback) => {
  onValue(ref(db, "articles"), (snapshot) => {
    const data = snapshot.val();
    const categories = Object.values(data).map((article) => article.category);
    // Remove duplicates
    const uniqueCategories = [...new Set(categories)]
    callback(uniqueCategories);
  });
}