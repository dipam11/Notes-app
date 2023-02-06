import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyC8E7vxpaDXXpS3HN_k887Klv0cnhMGK00",
  authDomain: "notes-app-36d35.firebaseapp.com",
  databaseURL: "https://notes-app-36d35-default-rtdb.firebaseio.com/",
  projectId: "notes-app-36d35",
  storageBucket: "notes-app-36d35.appspot.com",
  messagingSenderId: "105107930628",
  appId: "1:105107930628:web:6318648da94d6e3764ff51"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
