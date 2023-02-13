import { collection, getDocs } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"

export const loadEntries = async( uid: string ) => {

  const collectionRef = collection( FirebaseDB, `kanban/${uid}/entries`);
  const docs = await getDocs(collectionRef);

  const notes: any[] = [];
  docs.forEach( doc => {
    notes.push({ ...doc.data(), id: doc.id });
  } )

  return notes;
}