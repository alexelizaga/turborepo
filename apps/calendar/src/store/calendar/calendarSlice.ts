import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Event } from '../../calendar';

interface CalendarState {
  isLoadingEvents: boolean;
  isDateModalOpen: boolean;
  events: Event[];
  activeEvent: Event | null;
}

const initialState: CalendarState = {
  isLoadingEvents: true,
  isDateModalOpen: false,
  events: [],
  activeEvent: null
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
      onOpenDateModal: ( state ) => {
        state.isDateModalOpen = true;
      },
      onCloseDateModal: ( state ) => {
        state.isDateModalOpen = false;
      },
      onSetActiveEvent: ( state, { payload }: PayloadAction<Event> ) => {
        state.activeEvent = payload;
      },
      onAddNewEvent: ( state, { payload }: PayloadAction<Event> ) => {
        state.events.push(payload);
        state.activeEvent = null;
      },
      onUpdateEvent: ( state, { payload }: PayloadAction<Event> ) => {
        state.events = state.events.map( event => {
          if (event.id === payload.id) {
            return payload;
          }
          return event;
        })
      },
      onDeleteEvent: ( state ) => {
        if ( !!state.activeEvent ) {
          state.events =  state.events.filter( event => event.id !== state.activeEvent?.id );
          state.activeEvent = null;
        }
        
      },
      onLoadEvents: (state, { payload }: PayloadAction<Event[]>) => {
        state.isLoadingEvents = false;
        payload.forEach( event => {
          const exist = state.events.some( dbEvent => dbEvent.id === event.id );
          if (!exist ) {
            state.events.push( event );
          }
        })
      },
      onLogoutCalendar: ( state ) => {
        state.isLoadingEvents = true,
        state.isDateModalOpen = false,
        state.events = [],
        state.activeEvent = null
      }
    }
});


// Action creators are generated for each case reducer function
export const {
  onAddNewEvent,
  onCloseDateModal,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onOpenDateModal,
  onSetActiveEvent,
  onUpdateEvent,
} = calendarSlice.actions;