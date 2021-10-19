import { initializeApp } from 'firebase/app'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
  onSnapshot,
} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {

};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export const getCollection = collectionName => collection(db, collectionName);

export const saveDoc = async (collectionName, doc) => {
  const collectionRef = getCollection(collectionName);
  const docRef = await addDoc(collectionRef, doc);
  return docRef
}

export const getAllDocs = async collectionName => {
  const collectionRef = getCollection(collectionName);
  const docs = await getDocs(collectionRef);
  return docs
}

export const removeDoc = async (collectionName, docId) => {
  const docRef = doc(db, collectionName, docId);
  await deleteDoc(docRef);
}

export const subscribeToCollection = (collectionName, callback) => {
  const collectionRef = getCollection(collectionName);
  onSnapshot(collectionRef, callback);
}

export const docById = async (collectionName, docId) => {
  const docRef = doc(db, collectionName, docId);
  const docSnapshot = await getDoc(docRef);

  if(!docSnapshot.exists()) {
    return null
  }

  return docSnapshot.data()
}

export const updateDocById = async (collectionName, docId, data) => {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, data);
}

export const getQuery = async (collectionName) => {
  const collectionRef = getCollection(collectionName);
  const q = query(collectionRef, where('title', '==', 'Make it Real'))

  const docsSnapshot = await getDocs(q)
  docsSnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });

}

export default firebaseApp;
