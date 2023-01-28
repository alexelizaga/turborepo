import { FC, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { EntriesContext, entriesReducer } from './';
import { EntryType } from 'ui';

export type EntriesState = {
  entries: EntryType[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description: 'To Do:Sunt nostrud adipisicing non veniam incididunt qui dolore pariatur id qui esse reprehenderit.',
      status: 'to-do',
      createdAt: Date.now()
    },
    {
      _id: uuidv4(),
      description: 'In Progress: Anim voluptate amet officia in.',
      status: 'in-progress',
      createdAt: Date.now() - 1000000
    },
    {
      _id: uuidv4(),
      description: 'Done: Anim deserunt consequat cupidatat ipsum cupidatat.',
      status: 'done',
      createdAt: Date.now() - 100000000
    }
  ]
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

  return (
    <EntriesContext.Provider value={{
      ...state,
      addNewEntry
    }}>
      { children }
    </EntriesContext.Provider>
  )
}
