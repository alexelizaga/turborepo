import { FC, useEffect, useMemo, useReducer } from "react";

import { Entry } from "@/interfaces";
import { entriesApi } from "@/apis";

import { EntriesContext, entriesReducer } from "./";
import { useSnackbar } from "notistack";

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();

  const addNewEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>("/entries", { description });
    dispatch({ type: "[Entry] Add-Entry", payload: data });
  };

  const updateEntry = async ({_id, description, status}: Entry, showSnackbar = false) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status
      });
      dispatch({ type: "[Entry] Entry-Updated", payload: data });

      if (showSnackbar) {
        enqueueSnackbar('Updated entry', {
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }
        });
      }
    } catch (error) {
      console.log({error});
    }
  };

  const deleteEntry = async (_id: string) => {
    try {
      await entriesApi.delete(`/entries/${_id}`);
      dispatch({ type: "[Entry] Entry-Deleted", payload: _id });
      enqueueSnackbar('Deleted entry', {
        variant: 'success',
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }
      });
    } catch (error) {
      console.log({error});
    }
  }

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>("/entries");
    dispatch({ type: "[Entry] Refresh-Entries", payload: data });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  const providerValue = useMemo(
    () => ({
      ...state,
      addNewEntry,
      updateEntry,
      deleteEntry
    }),
    [state]
  );

  return (
    <EntriesContext.Provider value={providerValue}>
      {children}
    </EntriesContext.Provider>
  );
};
