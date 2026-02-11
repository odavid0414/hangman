import { collection, getDocs } from 'firebase/firestore';
import { db } from './';

export async function smokeTestWords() {
  const snapshot = await getDocs(collection(db, 'words'));
  snapshot.forEach(doc => {
    console.log(doc.id, doc.data());
  });
}
