import { useEffect, useState } from 'react';
import { addHours } from 'date-fns';
import { Calendar, View } from 'react-big-calendar';
import { getAnalytics, logEvent } from "firebase/analytics";

import { CalendarLayout, localizer,  getMessagesEs, CalendarEvent, Event, CalendarModal } from '../';
import { useAuthStore, useCalendarStore } from '../../store';
import { BcFabAddNew, BcFabDelete } from '../../shared';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useTheme } from '@mui/material';


export const CalendarPage = () => {
  const theme = useTheme();
  const analytics = getAnalytics();
  const { uid, displayName } = useAuthStore();
  const {
    openDateModal,
    events,
    setActiveEvent,
    startLoadingEvents,
    startDeletingEvent,
    hasEventSelected,
    isDateModalOpen
  } = useCalendarStore();
  const [lastView, setLastView] = useState<View>(localStorage.getItem("lastView") as View || 'month');

  useEffect(() => {
    startLoadingEvents();
  }, [])

  const eventStyleGetter = ( event: Event ) => {
    const isMyEvent = ( uid === event.user.uid );
    const style: React.CSSProperties = {
      backgroundColor: isMyEvent ? theme.palette.primary.main : '#465660',
      borderRadius: '5px',
      color: theme.palette.text.primary
    }

    return {
      style
    }
  }

  const onDoubleClick = (event: Event) => {
    logEvent(analytics, 'calendar_onDoubleClick', { event });
    openDateModal();
  }

  const onSelect = (event: Event) => {
    logEvent(analytics, 'calendar_onSelect', { event });
    setActiveEvent(event);
  }

  const onViewChanged = (view: View) => {
    logEvent(analytics, 'calendar_onViewChanged', { view });
    localStorage.setItem('lastView', view)
    setLastView(view);
  }

  const handleClickNew = () => {
    logEvent(analytics, 'calendar_handleClickNew');
    setActiveEvent({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours( new Date(), 1 ),
      bgColor: '#fafafa',
      user: {
        uid: uid,
        name: displayName
      }
    });
    openDateModal();
  }

  const handleDelete = () => {
    logEvent(analytics, 'calendar_handleDelete');
    startDeletingEvent();
  }

  return (
    <CalendarLayout>
      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 120px)' }}
        messages={  getMessagesEs() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />

      <CalendarModal />
      <BcFabAddNew
        onClick={handleClickNew}
      />
      <BcFabDelete
        onClick={handleDelete}
        display= {hasEventSelected && !isDateModalOpen ? '' : 'none'}
      />
    </CalendarLayout>
  )
}
