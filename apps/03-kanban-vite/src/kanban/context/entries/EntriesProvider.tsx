import { FC, useMemo, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { EntriesContext, entriesReducer } from './';
import { EntryType } from 'ui';

export type EntriesState = {
  entries: EntryType[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: []
}

type EntriesProviderProps = {
  children: React.ReactNode;
}

export const EntriesProvider: FC<EntriesProviderProps> = ({ children }) => {

  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

  const addNewEntry = ( description: string ) => {
    const newEntry: EntryType = {
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: 'to-do'
    }
    dispatch({ type: '[Entry] - Add-Entry', payload: newEntry })
  }

  const updateEntry = (entry: EntryType) => {
    dispatch({ type: '[Entry] - Update-Entry', payload: entry });
  }

  const providerValue = useMemo(() => ({
    ...state,
    addNewEntry,
    updateEntry
  }), [state]);

  return (
    <EntriesContext.Provider value={providerValue}>
      { children }
    </EntriesContext.Provider>
  )
}
