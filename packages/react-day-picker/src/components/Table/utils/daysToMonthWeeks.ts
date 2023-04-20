import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
dayjs.extend(weekOfYear);

import { MonthWeek } from './getMonthWeeks';

/** Return the weeks between two dates.  */
export function daysToMonthWeeks(
  fromDate: dayjs.Dayjs,
  toDate: dayjs.Dayjs
): MonthWeek[] {
  const toWeek = fromDate.endOf('week');
  const fromWeek = toDate.startOf('week');

  const nOfDays = toWeek.diff(fromWeek, 'day');
  const days: dayjs.Dayjs[] = [];

  for (let i = 0; i <= nOfDays; i++) {
    days.push(fromWeek.add(i, 'day'));
  }

  const weeksInMonth = days.reduce((result: MonthWeek[], date) => {
    const weekNumber = date.week();

    const existingWeek = result.find(
      (value) => value.weekNumber === weekNumber
    );
    if (existingWeek) {
      existingWeek.dates.push(date);
      return result;
    }
    result.push({
      weekNumber,
      dates: [date]
    });
    return result;
  }, []);

  return weeksInMonth;
}
