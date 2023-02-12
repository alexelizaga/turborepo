import { BcFab, BcDeleteTwoToneIcon } from '../..';


type BcFabDeleteProps = {
  onClick: () => void,
  disabled?: boolean,
  display?: string
}

export const BcFabDelete = ({
  disabled,
  display = '',
  onClick
}: BcFabDeleteProps) => {

  return (
    <BcFab
      onClick={onClick}
      disabled={disabled}
      color="error"
      aria-label="add"
      sx={{
        display: display,
        bottom: "25px",
        position: "absolute",
        left: "25px"
      }} 
    >
      <BcDeleteTwoToneIcon />
    </BcFab>
  )
}