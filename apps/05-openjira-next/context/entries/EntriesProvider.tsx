import { FC, useMemo, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Entry } from '../../interfaces';

import { EntriesContext, entriesReducer } from './';

export interface EntriesState {
    entries: Entry[];
}


const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
}

type Props = {
    children: JSX.Element | JSX.Element[];
}

export const EntriesProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( entriesReducer , Entries_INITIAL_STATE );

    const addNewEntry = ( description: string ) => {

        const newEntry: Entry = {
            _id: uuidv4(),
            description,
            createdAt: Date.now(),
            status: 'pending'
        }

        dispatch({ type: '[Entry] Add-Entry', payload: newEntry });
    }

    const updateEntry = ( entry: Entry ) => {

        dispatch({ type: '[Entry] Entry-Updated', payload: entry });

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
};