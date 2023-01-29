import { FC } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';

type Props = {
  open?: boolean;
  header?: {
    title?: string,
    icon?: JSX.Element
  };
  onClose?: () => void;
  onClick?: () => void;
  children?: JSX.Element | JSX.Element[];
}

export const Modal: FC<Props> = ({
  open = true,
  header,
  onClose,
  onClick,
  children
}) => {

  return (
    <Dialog disableEscapeKeyDown open={open} onClose={onClose}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        { header?.icon && header?.icon }
        { header?.title && <DialogTitle>{header?.title}</DialogTitle>}
      </Box>
      <DialogContent>
        { children }
      </DialogContent>
      { (onClose || onClick) && (
        <DialogActions>
          { onClose && <Button onClick={onClose}>{'Cancel'}</Button> }
          { onClick && <Button onClick={onClick}>{'Ok'}</Button> }
        </DialogActions>
      )}
    </Dialog>
  )
}
