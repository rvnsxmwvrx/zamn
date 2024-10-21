import { initializeApp } from "firebase/app";
import { getDocs, getFirestore } from "firebase/firestore/lite";
import { collection } from "firebase/firestore/lite";
import { configDotenv } from "dotenv";
configDotenv()

const firebaseConfig = {
  apiKey: process.env.SECRET_API_KEY!,
  authDomain: process.env.SECRET_AUTH_DOMAIN!,
  projectId: process.env.SECRET_PROJECT_ID!,
  storageBucket: process.env.SECRET_STORAGE_BUCKET!,
  messagingSenderId: process.env.SECRET_MENSSAGER_ID!,
  appId: process.env.SECRET_APP_ID!,
  measurementId: process.env.SECRET_MEASUREMENT_ID!,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function GET() {
    let bunkrLinks = collection(db, "bunkrLinks");
    let links = await getDocs(bunkrLinks);
    let videos = links.docs.map((doc) => doc.data())
    return new Response(JSON.stringify({videos}), {status:200})
}