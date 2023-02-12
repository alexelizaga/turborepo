import { BcFab, BcAddIcon } from "../..";


type BcFabAddNewProps = {
  onClick: () => void,
  disabled?: boolean
}

export const BcFabAddNew = ({
  disabled,
  onClick
}: BcFabAddNewProps) => {
  return (
    <BcFab
      onClick={onClick}
      disabled={disabled}
      color="inherit"
      aria-label="add"
      sx={{ bottom: "25px", position: "absolute", right: "25px", backgroundColor: "primary.main" }}
    >
      <BcAddIcon />
    </BcFab>
  )
}
