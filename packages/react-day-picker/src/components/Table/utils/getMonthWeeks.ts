import dayjs from 'dayjs';

import { daysToMonthWeeks } from './daysToMonthWeeks';

/** Represents a week in the month.*/
export type MonthWeek = {
  /** The week number from the start of the year. */
  weekNumber: number;
  /** The dates in the week. */
  dates: dayjs.Dayjs[];
};

function getWeeksInMonth(month: dayjs.Dayjs): number {
  const startOfMonth = month.startOf('month');
  const endOfMonth = month.endOf('month');

  return endOfMonth.diff(startOfMonth, 'week');
}

/**
 * Return the weeks belonging to the given month, adding the "outside days" to
 * the first and last week.
 */
export function getMonthWeeks(
  month: Date,
  options: {
    locale: Locale;
    useFixedWeeks?: boolean;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
    ISOWeek?: boolean;
  }
): MonthWeek[] {
  const weeksInMonth: MonthWeek[] = daysToMonthWeeks(
    dayjs(month).startOf('month'), //startOfMonth(month),
    dayjs(month).endOf('month') //startOfMonth(month),
  );

  if (options?.useFixedWeeks) {
    // Add extra weeks to the month, up to 6 weeks
    const nrOfMonthWeeks = getWeeksInMonth(dayjs(month));
    if (nrOfMonthWeeks < 6) {
      const lastWeek = weeksInMonth[weeksInMonth.length - 1];
      const lastDate = lastWeek.dates[lastWeek.dates.length - 1];
      const toDate = lastDate.add(6 - nrOfMonthWeeks, 'week');
      const extraWeeks = daysToMonthWeeks(lastDate.add(1, 'week'), toDate);
      weeksInMonth.push(...extraWeeks);
    }
  }
  return weeksInMonth;
}
