import type { Locale } from 'date-fns';
import dayjs from 'dayjs';

import { ActiveModifiers } from 'types/Modifiers';

/** Map of functions to translate ARIA labels for the relative elements. */
export type Labels = {
  labelMonthDropdown: () => string;
  labelYearDropdown: () => string;
  labelNext: NavButtonLabel;
  labelPrevious: NavButtonLabel;
  /** @deprecated This label is not used anymore and this function will be removed in the future. */
  labelDay: DayLabel;
  labelWeekday: WeekdayLabel;
  labelWeekNumber: WeekNumberLabel;
};

/** Return the ARIA label for the {@link Day} component. */
export type DayLabel = (day: dayjs.Dayjs) => string;

/** Return the ARIA label for the "next month" / "prev month" buttons in the navigation.*/
export type NavButtonLabel = (month?: dayjs.Dayjs) => string;
/** Return the ARIA label for the Head component.*/
export type WeekdayLabel = (day: dayjs.Dayjs) => string;

/** Return the ARIA label of the week number.*/
export type WeekNumberLabel = (n: number) => string;
