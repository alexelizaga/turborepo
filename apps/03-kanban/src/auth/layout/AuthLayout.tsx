import { Grid, Typography } from '@mui/material';

interface AuthLayoutProps {
    children: JSX.Element | JSX.Element[],
    title: string
}

export const AuthLayout = ({ children, title = '' }: AuthLayoutProps ) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
    >
      <Grid
        item
        className="box-shadow"
        xs={3}
        sx={{
            backgroundColor: "white",
            borderRadius: 2,
            padding: 3,
            width: { sm: 450 }
        }}
      >
        <Typography variant="h5" sx={{ mb: 1 }}>{ title }</Typography>
        { children }
      </Grid>
    </Grid>
  );
};
