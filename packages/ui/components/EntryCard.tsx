import { DragEvent, FC } from 'react';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';

import { EntryType } from '../';

type Props = {
  entry: EntryType;
  setIsDragging: (isDragging: boolean) => void;
}

export const EntryCard: FC<Props> = ({entry, setIsDragging}) => {

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text', entry._id)
    setIsDragging(true);
  }

  const onDragEnd = () => {
    setIsDragging(false);
  }

  return (
    <Card
      sx={{ mb: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line'}}>{ entry.description }</Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'end', pr: 2 }}>
          <Typography variant="body2">30 minutes ago</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
