import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const fileUpload = async(file: any, uid: string, id: string): Promise<any> => {
  // if (!file) throw new Error('There is no file to upload');
  if (!file) return null;

  const storage = getStorage();
  const storageRef = ref(storage, `journal/${uid}/${id}/${file.name}`);

  try {

    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);

  } catch (error: any) {
    // throw new Error( error.message );
    return null;
  }

  
}