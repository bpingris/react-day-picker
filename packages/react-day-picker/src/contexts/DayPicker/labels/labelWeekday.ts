import { WeekdayLabel } from 'types/Labels';

/**
 * The default ARIA label for the Weekday element.
 */
export const labelWeekday: WeekdayLabel = (day): string => {
  return day.format('dddd');
};
