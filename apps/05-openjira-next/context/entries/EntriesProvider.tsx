import { FC, useEffect, useMemo, useReducer } from 'react';

import { Entry } from '@/interfaces';
import { entriesApi } from '@/apis';

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

    const addNewEntry = async( description: string ) => {

        const { data } = await entriesApi.post<Entry>('/entries', { description })

        dispatch({ type: '[Entry] Add-Entry', payload: data });
    }

    const updateEntry = ( entry: Entry ) => {

        dispatch({ type: '[Entry] Entry-Updated', payload: entry });

    }

    const refreshEntries = async() => {
        const { data } = await entriesApi.get<Entry[]>('/entries');
        dispatch({ type: '[Entry] Refresh-Entries', payload: data });
    }

    useEffect(() => {
        refreshEntries();
    }, []);
    

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