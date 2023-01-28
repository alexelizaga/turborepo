import { FC, useMemo } from 'react';
import { List, Paper } from '@mui/material';

import { EntryCard } from './';
import { EntryType } from '../';

type Props = {
  status: string;
  entries: EntryType[]
}

export const EntryList: FC<Props> = ({ status, entries }) => {
  const entriesByStatus = useMemo( () => entries.filter(entry => entry.status === status) , [entries, status]);
  return (
    <div>
      <Paper sx={{ height: 'calc(100vh - 180px)', overflow: 'scroll', backgroundColor: 'transparent', p: '3px 5px' }}>
        <List sx={{ opacity: 1 }}>
          {
            entriesByStatus.map(entry => (
              <EntryCard key={entry._id} entry={entry} />
            )) 
          }
        </List>
      </Paper>
    </div>
  )
}