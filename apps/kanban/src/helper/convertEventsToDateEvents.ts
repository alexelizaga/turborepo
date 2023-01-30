import { parseISO } from "date-fns";
import { Event } from "../calendar";


export const convertEventsToDateEvents = ( events: Event[] = [] ): Event[] => {
  return events.map( event => {
    if (typeof event.start === 'string') {
      event.start = parseISO(event.start);
    }
    if (typeof event.end === 'string') {
      event.end = parseISO(event.end);
    }
    
    return event;
  } )
}

export const convertEventToDateEvent = ( event: Event | any ): Event => {
  if (typeof event.start === 'string') {
    event.start = parseISO(event.start);
  }
  if (event.start.seconds) {
    event.start = new Date(event.start.seconds*1000);
  }
  if (typeof event.end === 'string') {
    event.end = parseISO(event.end);
  }
  if (event.end.seconds) {
    event.end = new Date(event.end.seconds*1000);
  }
  
  return { ...event };
}