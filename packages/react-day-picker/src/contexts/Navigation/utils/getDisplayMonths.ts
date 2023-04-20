import dayjs from 'dayjs';

/**
 * Return the months to display in the component according to the number of
 * months and the from/to date.
 */
export function getDisplayMonths(
  month: Date,
  {
    reverseMonths,
    numberOfMonths
  }: {
    reverseMonths?: boolean;
    numberOfMonths: number;
  }
): dayjs.Dayjs[] {
  const start = dayjs(month).startOf('month');
  const end = start.add(numberOfMonths, 'month').startOf('month');
  const monthsDiff = end.diff(start, 'month');
  let months: dayjs.Dayjs[] = [];

  for (let i = 0; i < monthsDiff; i++) {
    const nextMonth = start.add(i, 'month');
    months.push(nextMonth);
  }

  if (reverseMonths) months = months.reverse();
  return months;
}
