import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note } from '../../interfaces';

interface JournalState {
    isSaving: boolean;
    messageSaved: string;
    notes: Array<Record<string, any>>;
    active: null | Note
}

const initialState: JournalState = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null
}

export const journalSlice = createSlice({
    name: 'journal',
    initialState,
    reducers: {
      onSavingNewNote: (state) => {
        state.isSaving = true;
      },
      onAddNewEmptyNote: (state, { payload }: PayloadAction<Note>) => {
        state.notes.push( payload );
        state.isSaving = false;
      },
      onSetActiveNote: (state, { payload }: PayloadAction<Note>) => {
        state.active = payload;
        state.messageSaved = '';
      },
      onSetNotes: (state, { payload }: PayloadAction<Note[]>) => {
        state.notes = payload;
      },
      onSetSaving: (state) => {
        state.isSaving = true;
        state.messageSaved = '';
      },
      onNoteUpdated: (state, { payload }: PayloadAction<Note>) => {
        state.isSaving = false;
        state.notes = state.notes.map( note => {
          if ( note.id === payload.id ) {
            return payload;
          }
          return note;
        });

        state.messageSaved = `${payload.title}, correctly updated`;
      },
      onSetPhotosToActiveNote: (state, { payload }: PayloadAction<any>) => {
        if ( state.active && state.active.imageUrls ){
          state.active.imageUrls = [ ...state.active.imageUrls, ...payload ];
        }
        state.isSaving = false;
      },
      onClearNotesLogout: (state) => {
        state.isSaving = false;
        state.messageSaved = '';
        state.notes = [];
        state.active = null;
      },
      onDeleteNoteById: (state, { payload }: PayloadAction<string>) => {
        state.active = null;
        state.notes = state.notes.filter( note => note.id !== payload );
      },
    }
});


// Action creators are generated for each case reducer function
export const {
  onAddNewEmptyNote,
  onClearNotesLogout,
  onDeleteNoteById,
  onNoteUpdated,
  onSavingNewNote,
  onSetActiveNote,
  onSetNotes,
  onSetPhotosToActiveNote,
  onSetSaving
} = journalSlice.actions;
