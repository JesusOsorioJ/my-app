import { collection, query, where, 
    addDoc, getDocs, getDoc, doc, onSnapshot, updateDoc,
    setDoc  } from 'firebase/firestore';
import { db } from '../utils/firebase';

export async function getAllCollection( collectionName) {
    const Col = collection(db, collectionName);
    const Snapshot = await getDocs( Col);
    const docList = Snapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
    });
    return docList;
}
// const citiesRef = collection(db, "formStudent");
//   await setDoc(doc(citiesRef, "Hola mundo"), {})

export async function addDocument(collectionName, data){
    const docRef = await addDoc(collection(db, collectionName), data);
    const docSnap = await getDoc(docRef);
    return { id: docRef.id, ...docSnap.data() };
}

export async function addOneDocument(collectionName, id, data){
    const docRef = collection(db, collectionName);
    const docSnap = await setDoc(doc(docRef, id), data)
    return docSnap;
}

export async function updateDocument(collectionName, id, data){
    const docRef = doc(db, collectionName, id);
    const docSnap = await updateDoc(docRef, data);
    return { id: docRef.id, ...docSnap };
}

export const onSnapshotData = onSnapshot;

export function getCollection(collectionName, email){
   return query(collection(db, collectionName), where("email", "==", email));
}

export function getIdCollection(collectionName, id){
    return doc(db, collectionName,id);
 }


export async function getOneCollection(collectionName, id) {
  const docRef = doc(db, collectionName, id );
  const docSnap = await getDoc(docRef);
    return docSnap.data()
}

export async function getOneCollectionForParams(collectionName, params, valueparams) {
    const docRef = query(collection(db, collectionName), where("idForm", "==", valueparams));
    const docSnap = await getDoc(docRef);
      return docSnap.data()
  }

  export async function getOneCollectionForParams1(collectionName, params, valueparams) {
    const docRef = query(collection(db, collectionName), where(params, "==", valueparams));
    const docSnap = await getDoc(docRef);
      return docSnap.data()
  }


export async function  getOnSnapshotCollection(collectionName,id){
    const col = collection(db, collectionName, id );
    const unsubscribe = onSnapshot(col, (querySnapshot) => {
        const collection = [];
        querySnapshot.forEach((doc) => {
            collection.push(doc.data());
        });
    });
    return unsubscribe
}

export function randomString(length){
    const chars  = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' 
      var result = '';
      for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
      return result;
  }

