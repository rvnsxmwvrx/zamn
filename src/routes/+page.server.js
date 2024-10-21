import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDocs, getFirestore } from "firebase/firestore/lite";
import { collection } from "firebase/firestore/lite";
import { videos } from "$lib/stores";

let env = import.meta.env;

const firebaseConfig = {
  apiKey: "AIzaSyD27u6zbQaKPlwcxQuXWM83BCMPkzvbAmY",
  authDomain: "zamn-dd1e1.firebaseapp.com",
  projectId: "zamn-dd1e1",
  storageBucket: "zamn-dd1e1.appspot.com",
  messagingSenderId: "1026776106004",
  appId: "1:1026776106004:web:1583919e9e8b17f1dcd301",
  measurementId: "G-T45JPDGEQ2",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const actions = {
  getVideos: async () => {
    let bunkrLinks = collection(db, "links");
    let links = await getDocs(bunkrLinks);
    videos.set(links.docs.map((doc) => doc.data().name));
  },
};