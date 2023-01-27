import { collection, getDocs } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"

export const loadNotes = async( uid: string ) => {

  const collectionRef = collection( FirebaseDB, `journal/${uid}/notes`);
  const docs = await getDocs(collectionRef);

  const notes: any[] = [];
  docs.forEach( doc => {
    notes.push({ ...doc.data(), id: doc.id });
  } )

  return notes;
}