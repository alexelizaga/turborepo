import { useAppSelector } from '../../../store';
import { loadEntries } from '../../helpers';
import { EntryType } from '../../interfaces';


export const useEntriesContext = () => {
  const { uid } = useAppSelector( store => store.auth);
  
  const startLoadingEntries = async () => {
    if ( !uid ) throw new Error('User UID does not exist');

    const entries = await loadEntries( uid );
    setEntries(entries);
  }

  const setEntries = (entries: EntryType[]) => {
    console.log(entries)
  }

  return {
    // Properties

    // Methods
    setEntries,
    startLoadingEntries
  }
}