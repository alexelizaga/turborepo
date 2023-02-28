import { Box } from "@mui/material";
import { BcFab, BcAddIcon } from "../../";


type BcFabAddNewProps = {
  onClick: () => void,
  disabled?: boolean
}

export const BcFabAddNew = ({
  disabled,
  onClick
}: BcFabAddNewProps) => {
  return (
    <Box color="white" sx={{bottom: "25px", position: "absolute", right: "25px", }}>
      <BcFab
        onClick={onClick}
        disabled={disabled}
        color="inherit"
        aria-label="add"
        sx={{ backgroundColor: "primary.main" }}
      >
        <BcAddIcon />
      </BcFab>
    </Box>
  )
}
