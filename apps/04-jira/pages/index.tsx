import { useContext, useMemo } from 'react';
import { NextPage } from 'next';

import { Layout } from '../layout';
import { EntryKanban, EntryList, NewEntry } from 'ui';
import { EntriesContext, UIContext } from '../context';

const HomePage: NextPage = () => {
  const {
    isAddingEntry,
    setIsAddingEntry,
    isDraggingEntry,
    setIsDraggingEntry
  } = useContext(UIContext);
  const { entries, addNewEntry, updateEntry } = useContext(EntriesContext);

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
    <Layout title="Kanban">
      <EntryKanban boards={boards} />
    </Layout>
  )
}

export default HomePage;