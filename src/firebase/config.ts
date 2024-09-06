import { getFirestore, collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { v4 } from 'uuid';

const firebaseConfig = {
   apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
   authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
   projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
   storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
   appId: import.meta.env.VITE_FIREBASE_APPID
};

export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseStorage = getStorage(FirebaseApp);

export const FirebaseFirestore = getFirestore(FirebaseApp);

export async function uploadFile(file: File) {
   const storageRef = ref(FirebaseStorage, v4());

   await uploadBytes(storageRef, file);

   const url = await getDownloadURL(storageRef);

   return url;
}

export function savePost(post: { title: string; urlImage: string; email: string }) {
   addDoc(collection(FirebaseFirestore, 'posts'), { ...post, likes: [] });
}

export function getPosts() {
   return getDocs(collection(FirebaseFirestore, 'posts'));
}

export function updatePost(id: string, newPost: { title: string; urlImage: string; email: string; likes: string[] }) {
   return updateDoc(doc(FirebaseFirestore, 'posts', id), newPost);
}
