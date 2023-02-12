import { createContext } from "react";

import { EntryType } from 'ui';

type ContextProps = {
  entries: EntryType[];
  addNewEntry: (description: string) => void;
  updateEntry: (entry: EntryType) => void;
}

export const EntriesContext = createContext({} as ContextProps);