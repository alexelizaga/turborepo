import { getAnalytics, logEvent } from "firebase/analytics";

import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { useEffect } from 'react';
import { BcFabAddNew } from '../../shared';
import { useJournalStore } from '../../store';

export const JournalPage = () => {
  const analytics = getAnalytics();
  const { isSaving, active, startNewNote, startLoadingNotes } = useJournalStore();

  useEffect(() => {
    startLoadingNotes();
  }, [])

  const onClickNewNote = () => {
    logEvent(analytics, 'journal_onClickNewNote');
    startNewNote();
  }

  return (
    <JournalLayout>
      {
        (!!active)
          ? <NoteView />
          : <NothingSelectedView />
      }
      <BcFabAddNew
        onClick={onClickNewNote}
        disabled={isSaving}
      />
    </JournalLayout>
  );
}
