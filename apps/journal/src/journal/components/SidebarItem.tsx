import { useMemo } from "react";
import { getAnalytics, logEvent } from "firebase/analytics";

import { BcGrid, BcListItem, BcListItemButton, BcListItemIcon, BcListItemText, BcTurnedInNot } from "../../shared";
import { Note } from "../../interfaces";
import { useAppDispatch } from '../../store/hooks';
import { onSetActiveNote } from "../../store/journal";


export const SidebarItem = ({
  title = '',
  body = '',
  id = '',
  date = 0,
  imageUrls = []
}: Note) => {
  const analytics = getAnalytics();
  const dispatch = useAppDispatch();

  const onClickNote = () => {
    logEvent(analytics, 'journal_onClickNote');
    const selectedNote = {
      body,
      id,
      title,
      date,
      imageUrls
    };
    dispatch( onSetActiveNote( selectedNote ) );
    
  }

  const newTitle = useMemo( () => {
    return title.length > 20
      ? title.substring(0,20) + '...'
      : title;
  }, [title])

  return (
    <BcListItem disablePadding>
      <BcListItemButton onClick={onClickNote}>
        <BcListItemIcon>
          <BcTurnedInNot />
        </BcListItemIcon>
        <BcGrid container>
          <BcGrid item xs={12}>
            <BcListItemText primary={newTitle} />
          </BcGrid>
          <BcGrid item xs={12}>
            <BcListItemText secondary={body} />
          </BcGrid>
        </BcGrid>
      </BcListItemButton>
    </BcListItem>
  )
}
