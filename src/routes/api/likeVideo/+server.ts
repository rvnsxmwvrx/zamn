import { initializeApp } from "firebase/app";
import { getDocs, getFirestore, query, where } from "firebase/firestore/lite";
import { collection } from "firebase/firestore/lite";
import { configDotenv } from "dotenv";
import type { RequestHandler } from "@sveltejs/kit";
import { updateDoc } from "firebase/firestore/lite";
import { increment } from "firebase/firestore/lite";
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


export const POST: RequestHandler = async ({ request }) => {
  try {
    const object = await request.json();
    const link = object.link;

    if (!link) {
      return new Response(JSON.stringify({ error: "Name is required" }), { status: 400 });
    }

    const dataRef = collection(db, "bunkrLinks");
    const q = query(dataRef, where("Link", "==", link));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return new Response(JSON.stringify({ message: "No document found with the given name" }), { status: 404 });
    }

    snapshot.forEach(async (doc) => {
      const docRef = doc.ref;

      await updateDoc(docRef, {
        Likes: increment(1)
      });
    });

    return new Response(JSON.stringify({ message: "View count updated successfully!" }), { status: 200 });

  } catch (error) {
    console.error("Error updating view count:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}