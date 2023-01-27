export type Event = {
  id?: string,
  title: string,
  notes: string,
  start: any | Date | string | { nanoseconds: number, seconds: number },
  end: any | Date | string | { nanoseconds: number, seconds: number },
  bgColor: string,
  user: {
    uid: string | null,
    name: string | null
  }
}