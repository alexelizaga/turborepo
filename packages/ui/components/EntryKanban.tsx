import { FC } from 'react'
import { Card, CardHeader, Grid } from '@mui/material'
import { EntryType } from '../interfaces'

type Props = {
  boards?: {
    title?: string,
    actions?: JSX.Element,
    list?: JSX.Element
  }[]
}

export const EntryKanban: FC<Props> = ({ boards }) => {
  if(!boards?.length) return<></>;
  const cols = 12 / boards.length;
  return (
    <Grid container spacing={2}>
      {
        boards.map( (board, index) => (
          <Grid key={index} item xs={12} sm={cols}>
            <Card sx={{ height: 'calc(100vh - 100px)' }}>
              <CardHeader title={board.title} />
              { board.actions && board.actions}
              { board.list && board.list }
            </Card>
          </Grid>
        ))
      }
    </Grid>
  )
}
