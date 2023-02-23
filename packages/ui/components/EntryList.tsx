import { DragEvent, FC, useMemo } from 'react';
import { List, Paper } from '@mui/material';

import { EntryCard } from './';
import { EntryType } from '../';

type Props = {
  status: string;
  entries: EntryType[];
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
  updateEntry?: (entry: EntryType) => void;
}

export const EntryList: FC<Props> = ({ status, entries, isDragging, setIsDragging, updateEntry }) => {
  const entriesByStatus = useMemo( () => entries.filter(entry => entry.status === status) , [entries, status]);

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text');
    const entry = {...entries.find( e => e._id === id )!};
    entry.status = status;
    updateEntry && updateEntry(entry);
    setIsDragging(false);
  }

  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? 'dragging' : ''}
      style={{
        flex: 1,
        display: 'flex',
        overflow: 'scroll'
        // backgroundColor: 'pink'
      }}
    >
      <Paper sx={{
        flex: 1,
        // height: 'calc(100vh - 180px)',
        overflow: 'scroll',
        backgroundColor: 'transparent',
        p: '3px 5px'
      }}>
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
          {
            entriesByStatus.map(entry => (
              <EntryCard key={entry._id} entry={entry} setIsDragging={setIsDragging} />
            )) 
          }
        </List>
      </Paper>
    </div>
  )
}
