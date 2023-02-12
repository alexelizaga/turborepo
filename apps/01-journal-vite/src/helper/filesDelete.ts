import { deleteObject, getStorage, listAll, ref } from "firebase/storage";

export const filesDelete = async(uid="", noteId=""): Promise<any> => {

  const storage = getStorage();
  const listRef = ref(storage, `journal/${uid}/${noteId}`);

  try {
    const resp = await listAll(listRef);
    if (!resp) return;
    resp.items.forEach((itemRef) => {
      deleteObject(itemRef)
    });
  } catch (error: any) {
    throw new Error( error.message );
  }
  
}
