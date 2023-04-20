import dayjs from 'dayjs';

/**
 * Generate a series of 7 days, starting from the week, to use for formatting
 * the weekday names (Monday, Tuesday, etc.).
 */
export function getWeekdays(): dayjs.Dayjs[] {
  const start = dayjs().startOf('week');
  const days = [];
  for (let i = 0; i < 7; i++) {
    const day = start.add(i, 'day');
    days.push(day);
  }
  return days;
}
