import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';

import { FirebaseDB } from '../../firebase/config';
import { filesDelete, fileUpload } from '../../helper';
import { Note } from '../../interfaces';
import { loadNotes } from '../../journal';
import {
  useAppDispatch,
  onAddNewEmptyNote,
  onClearNotesLogout,
  onDeleteNoteById,
  onNoteUpdated,
  onSavingNewNote,
  onSetActiveNote,
  onSetNotes,
  onSetPhotosToActiveNote,
  onSetSaving,
  useAppSelector
} from '../';


export const useJournalStore = () => {
  const dispatch = useAppDispatch();
  const { uid } = useAppSelector( store => store.auth);
  const { active, isSaving, messageSaved, notes } = useAppSelector( store => store.journal );

  const startNewNote = async () => {
    savingNewNote();

    const newNote: Note = {
      title: '',
      body: '',
      date: new Date().getTime(),
      imageUrls: []
    }

    const newDoc = doc( collection( FirebaseDB, `journal/${uid}/notes` ));
    await setDoc( newDoc, newNote );

    newNote.id = newDoc.id;

    addNewEmptyNote(newNote);
    setActiveNote(newNote);
  }
  
  const startLoadingNotes = async () => {
    if ( !uid ) throw new Error('User UID does not exist');

    const notes = await loadNotes( uid );
    setNotes(notes);
  }
  
  const startSavingNote = async () => {
    if (!active) return;
    setSaving();

    const noteToFireStore = { ...active };
    delete noteToFireStore.id;

    const docRef = doc( FirebaseDB, `journal/${uid}/notes/${active.id}`);
    await setDoc(docRef, noteToFireStore, {merge: true});

    noteUpdated(active);
  }
  
  const startUploadingFiles = async (files = []) => {
    if ( !uid || !active || !active.id ) return;
    setSaving();

    const fileUploadPromises = [];
    for ( const file of files ) {
      fileUploadPromises.push( fileUpload( file, uid, active.id ) );
    }

    const photosUrls = await Promise.all( fileUploadPromises );

    setPhotosToActiveNote(photosUrls);
  }
  
  const startDeletingNote = async () => {
    if ( !uid || !active || !active.id ) return;

    // Delete note images
    await filesDelete(uid, active.id);

    // Delete note
    const docRef = doc( FirebaseDB, `journal/${ uid }/notes/${active.id}`);
    await deleteDoc(docRef);

    deleteNoteById(active.id);
  }

  const savingNewNote = () => {
    dispatch(onSavingNewNote());
  }

  const addNewEmptyNote = (note: Note) => {
    dispatch(onAddNewEmptyNote(note));
  }

  const setActiveNote = (note: Note) => {
    dispatch(onSetActiveNote(note));
  }

  const setNotes = (notes: Note[]) => {
    dispatch(onSetNotes(notes));
  }

  const setSaving = () => {
    dispatch(onSetSaving());
  }

  const noteUpdated = (note: Note) => {
    dispatch(onNoteUpdated(note));
  }

  const setPhotosToActiveNote = (photosUrls: any) => {
    dispatch(onSetPhotosToActiveNote(photosUrls));
  }

  const clearNotesLogout = () => {
    dispatch(onClearNotesLogout());
  }

  const deleteNoteById = (noteId: string) => {
    dispatch(onDeleteNoteById(noteId));
  }

  return {
    // Properties
    active,
    isSaving,
    messageSaved,
    notes,

    // Methods
    addNewEmptyNote,
    clearNotesLogout,
    deleteNoteById,
    noteUpdated,
    savingNewNote,
    setActiveNote,
    setNotes,
    setPhotosToActiveNote,
    setSaving,
    startDeletingNote,
    startLoadingNotes,
    startNewNote,
    startSavingNote,
    startUploadingFiles,
  }
}