import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore/lite';

import { Event } from '../../calendar';
import { FirebaseDB } from '../../firebase/config';
import { convertEventToDateEvent } from '../../helper';
import {
  useAppDispatch,
  useAppSelector,
  onOpenDateModal,
  onCloseDateModal,
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar
} from '../';


export const useCalendarStore = () => {
  const dispatch = useAppDispatch();
  const { isDateModalOpen, events, activeEvent } = useAppSelector(state => state.calendar);
  const { uid, displayName } = useAppSelector(state => state.auth);

  const openDateModal = () => {
    dispatch( onOpenDateModal() )
  }

  const closeDateModal = () => {
    dispatch( onCloseDateModal() )
  }

  const toggleDateModal = () => {
    (isDateModalOpen)
      ? closeDateModal()
      : openDateModal()
  }

  const startSavingEvent = async ( calendarEvent: Event ) => {
    try {
      if (calendarEvent.id) {
        // updating
        const eventToFireStore = { ...calendarEvent };
        const docRef = doc( FirebaseDB, `calendar/${uid}/events/${calendarEvent.id}`);
        await setDoc(docRef, eventToFireStore, {merge: true});

        dispatch(onUpdateEvent({
          ...calendarEvent,
          user: {
            uid: uid,
            name: displayName
          }
        }))
        return;
      }

      // creating
      const newDoc = doc( collection( FirebaseDB, `calendar/${uid}/events` ));
      await setDoc( newDoc, calendarEvent );
      dispatch(onAddNewEvent({
        ...calendarEvent,
        id:  newDoc.id,
        user: {
          uid: uid,
          name: displayName
        }
      }));
    } catch (error) {
      console.log(error);
    }
  }

  const startDeletingEvent = async () => {
    try {
      const docRef = doc( FirebaseDB, `calendar/${ uid }/events/${activeEvent?.id}`);
      await deleteDoc(docRef);

      dispatch( onDeleteEvent() );
    } catch  ( error ){
      console.log(error);
    }
    
  }

  const startLoadingEvents = async () => {
    try {
      const collectionRef = collection( FirebaseDB, `calendar/${uid}/events`);
      const docs = await getDocs(collectionRef);

      const events: Event[] = [];
      docs.forEach( doc => {
        events.push( convertEventToDateEvent( { ...doc.data(), id: doc.id } as Event ) );
      } )
      dispatch( onLoadEvents(events) );
    } catch (error) {
      console.log('Error loading events', error);
    }
  }

  const setActiveEvent = ( calendarEvent: Event ) => {
    dispatch(onSetActiveEvent(calendarEvent));
  }

  const logoutCalendar = () => {
    dispatch(onLogoutCalendar());
  }

  return {
    // Properties
    activeEvent,
    events,
    isDateModalOpen,
    hasEventSelected: !!activeEvent,

    // Methods
    closeDateModal,
    logoutCalendar,
    openDateModal,
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startSavingEvent,
    toggleDateModal,
  }
}