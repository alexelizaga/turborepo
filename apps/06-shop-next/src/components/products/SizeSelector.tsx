import { FC } from "react";
import { Box, Button } from "@mui/material";

import { ISize } from "@/interfaces";

type Props = {
  selectSize?: ISize;
  sizes: ISize[];
}

export const SizeSelector: FC<Props> = ({ selectSize, sizes }) => {
  return (
    <Box>
      {
        sizes.map( size => (
          <Button
            key={ size }
            size='small'
            color={ selectSize === size ? 'primary' : 'info' }
          >
            { size }
          </Button>
        ))
      }
    </Box>
  )
}
