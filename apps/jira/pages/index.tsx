import { useContext, useMemo } from 'react';
import { NextPage } from 'next';
import { Card, CardHeader, Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import { Layout } from '../layout';
import { EntryKanban, EntryList, NewEntry } from 'ui';
import { EntriesContext, UIContext } from '../context';

const HomePage: NextPage = () => {
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);
  const { entries, addNewEntry } = useContext(EntriesContext);

  const onEntrySave = ( description: string ) => {
    addNewEntry(description);
    setIsAddingEntry(false);
  }

  const boards = [
    {
      title: 'To Do',
      actions: <NewEntry isAdding={isAddingEntry} setIsAdding={setIsAddingEntry} onSave={onEntrySave} />,
      list: <EntryList status={'to-do'} entries={entries} />
    },
    {
      title: 'In Progress',
      list: <EntryList status={'in-progress'} entries={entries} />
    },
    {
      title: 'Done',
      list: <EntryList status={'done'} entries={entries} />
    }
  ]

  return (
    <Layout title="Home - Jira">
      <EntryKanban boards={boards} />
    </Layout>
  )
}

export default HomePage;