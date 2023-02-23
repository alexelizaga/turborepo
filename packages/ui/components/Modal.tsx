import { FC } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box
} from '@mui/material';

type Props = {
  t?: any;
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
  t = (text: string) => text,
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
        { header?.icon }
        { header?.title ? <DialogTitle>{header?.title}</DialogTitle> : <></>}
      </Box>
      <DialogContent>
        { children }
      </DialogContent>
      { (onClose || onClick) && (
        <DialogActions>
          { onClose && <Button onClick={onClose}>{t && t('Cancel')}</Button> }
          { onClick && <Button onClick={onClick}>{t && t('Ok')}</Button> }
        </DialogActions>
      )}
    </Dialog>
  )
}
