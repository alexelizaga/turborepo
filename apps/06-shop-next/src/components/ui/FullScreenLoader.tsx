import { Box, CircularProgress, Typography } from "@mui/material"

export const FullScreenLoader = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 200px)"
    >
      <Typography variant="h2" fontWeight={200} fontSize={20} sx={{ mb: 3 }}>
        Loading...
      </Typography>
      <CircularProgress thickness={2} />
    </Box>
  );
};
