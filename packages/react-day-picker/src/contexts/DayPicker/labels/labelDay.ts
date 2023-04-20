import { DayLabel } from 'types/Labels';

/**
 * The default ARIA label for the day button.
 */
export const labelDay: DayLabel = (day): string => {
  return day.format('DD MMMM (dddd)');
};
