/** Convert "HH:MM" → minutes since midnight */
export const timeToMinutes = (time: string): number => {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

/** Convert minutes since midnight → "HH:MM" */
export const minutesToTime = (mins: number): string => {
  const h = Math.floor(mins / 60).toString().padStart(2, '0')
  const m = (mins % 60).toString().padStart(2, '0')
  return `${h}:${m}`
}

/** Add hours to "HH:MM" string, caps at "23:59" */
export const addHoursToTime = (time: string, hours: number): string => {
  const result = Math.min(timeToMinutes(time) + hours * 60, 23 * 60 + 59)
  return minutesToTime(result)
}

/** True if [s1,e1) overlaps with [s2,e2) (all in "HH:MM") */
export const timesOverlap = (s1: string, e1: string, s2: string, e2: string): boolean =>
  timeToMinutes(s1) < timeToMinutes(e2) && timeToMinutes(e1) > timeToMinutes(s2)
