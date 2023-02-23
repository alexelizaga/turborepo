import { FC } from 'react';
import { Box, Drawer, SxProps, Theme, Typography } from "@mui/material";

export type MenuItem = {
  icon?: JSX.Element,
  text: string
}

type Props = {
  header?: {
    title?: string
  },
  anchor?:  "left" | "top" | "right" | "bottom";
  open?: boolean;
  width?: number;
  variant?: "permanent" | "persistent" | "temporary";
  onClose?: () => void;
  sx?: SxProps<Theme>;
  children?: JSX.Element | JSX.Element[];
}

export const Sidebar: FC<Props> = ({
  header,
  anchor = 'left',
  width = 250,
  open = true,
  variant = "temporary",
  sx,
  onClose,
  children
}) => {

  return (
    <Box
      component="nav"
      sx={sx}
    >
      <Drawer
        variant={ variant }
        anchor={ anchor }
        open={ open }
        onClose={ onClose }
      >
        <Box sx={{ width: anchor === 'left' || anchor === 'right' ? width : '100%' }}>
          <Box sx={{ p: '5px 10px' }}>
            <Typography variant="h4" >{ header?.title }</Typography>
          </Box>
          { children ?? <></> }
        </Box>
      </Drawer>
    </Box>
  )
}
