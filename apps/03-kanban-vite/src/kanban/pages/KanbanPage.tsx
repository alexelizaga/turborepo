import { useContext, useEffect } from 'react';
import { EntryKanban, EntryList, NewEntry } from 'ui';

import { KanbanLayout, EntriesContext, UIContext } from '../';
import { useEntriesContext } from '../context/entries/useEntriesContext';

export const KanbanPage = () => {
  const {
    isAddingEntry,
    setIsAddingEntry,
    isDraggingEntry,
    setIsDraggingEntry
  } = useContext(UIContext);
  const { entries, addNewEntry, updateEntry } = useContext(EntriesContext);
  const { startLoadingEntries } = useEntriesContext();

  useEffect(() => {
    startLoadingEntries();
  }, []);

  const onEntrySave = ( description: string ) => {
    addNewEntry(description);
    setIsAddingEntry(false);
  }

  const boards = [
    {
      title: 'To Do',
      actions: <NewEntry isAdding={isAddingEntry} setIsAdding={setIsAddingEntry} onSave={onEntrySave} />,
      list: (
        <EntryList
          status={'to-do'}
          entries={entries}
          isDragging={isDraggingEntry}
          setIsDragging={setIsDraggingEntry}
          updateEntry={updateEntry}
        />
      )
    },
    {
      title: 'In Progress',
      list: (
        <EntryList
          status={'in-progress'}
          entries={entries}
          isDragging={isDraggingEntry}
          setIsDragging={setIsDraggingEntry}
          updateEntry={updateEntry}
        />
      )
    },
    {
      title: 'Done',
      list: (
        <EntryList
          status={'done'}
          entries={entries}
          isDragging={isDraggingEntry}
          setIsDragging={setIsDraggingEntry}
          updateEntry={updateEntry}
        />
      )
    }
  ]
  return (
    <KanbanLayout>
      <EntryKanban boards={boards} />
    </KanbanLayout>
  )
}
