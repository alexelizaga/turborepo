import { FC, useMemo } from 'react';
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SxProps,
  Theme
} from '@mui/material';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';

import { NoteType } from '../interfaces';


type Props = {
  onClickNote: (note: NoteType) => void;
  sx?: SxProps<Theme>
}

export const SidebarItem: FC<NoteType & Props> = ({
  title = '',
  body = '',
  id = '',
  date = 0,
  imageUrls = [],
  onClickNote,
  sx
}) => {
  const newTitle = useMemo( () => {
    return title.length > 20
      ? title.substring(0,20) + '...'
      : title;
  }, [title])

  return (
    <ListItem disablePadding sx={sx}>
      <ListItemButton
        onClick={() => onClickNote({
          title,
          body,
          id,
          date,
          imageUrls
          })
        }
      >
        <ListItemIcon>
          <TurnedInNotIcon />
        </ListItemIcon>
        <Grid container>
          <Grid item xs={12}>
            <ListItemText primary={newTitle} />
          </Grid>
          <Grid item xs={12}>
            <ListItemText secondary={body} />
          </Grid>
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}
