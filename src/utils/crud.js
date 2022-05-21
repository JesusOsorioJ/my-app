import { collection, query, where, 
    addDoc, getDocs, getDoc, doc, onSnapshot, updateDoc  } from 'firebase/firestore';
import { db } from '../utils/firebase';

export async function getAllCollection( collectionName) {
    const Col = collection(db, collectionName);
    const Snapshot = await getDocs( Col);
    const docList = Snapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
    });
    return docList;
}

export async function addDocument(collectionName, data){
    const docRef = await addDoc(collection(db, collectionName), data);
    const docSnap = await getDoc(docRef);
    return { id: docRef.id, ...docSnap.data() };
}

export async function updateDocument(collectionName, id, data){
    const docRef = doc(db, collectionName, id);
    const docSnap = await updateDoc(docRef, data);
    return { id: docRef.id, ...docSnap };
}

export const onSnapshotData = onSnapshot;

export function getCollection(collectionName, id){
   return query(collection(db, collectionName), where("name", "==", id));
}

export function getIdCollection(collectionName, id){
    return doc(db, collectionName,id);
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

