import { Event } from "..";

export const CalendarEvent = ({ event }: { event: Event}) => {
  const { title, user } = event;

  return (
    <>
      <strong>{ title }</strong>
      <span> - { user?.name }</span>
    </>
  )
}
