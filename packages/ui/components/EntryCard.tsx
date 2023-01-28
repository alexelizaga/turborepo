import { FC } from 'react';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';

import { EntryType } from '../';

type Props = {
  entry: EntryType
}

export const EntryCard: FC<Props> = ({entry}) => {
  return (
    <Card
      sx={{ mb: 1 }}
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
