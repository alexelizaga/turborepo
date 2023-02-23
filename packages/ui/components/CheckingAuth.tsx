import { CircularProgress, Grid } from '@mui/material';
import { FC } from 'react';

type Props = {
  
}

export const CheckingAuth: FC<Props> = () => {
  return (
    <Grid
      position='absolute'
      top={0}
      left={0}
      right={0}
      bottom={0}
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      <Grid
        container
        direction='row'
        justifyContent='center'
      >
        <CircularProgress color='warning' />
      </Grid>
    </Grid>
  )
}
