import dayjs from 'dayjs';

/**
 * Returns the next month the user can navigate to according to the given
 * options.
 *
 * Please note that the next month is not always the next calendar month:
 *
 * - if after the `toDate` range, is undefined;
 * - if the navigation is paged, is the number of months displayed ahead.
 *
 */
export function getNextMonth(
  startingMonth: dayjs.Dayjs,
  options: {
    numberOfMonths?: number;
    fromDate?: dayjs.Dayjs;
    toDate?: dayjs.Dayjs;
    pagedNavigation?: boolean;
    today?: dayjs.Dayjs;
    disableNavigation?: boolean;
  }
): dayjs.Dayjs | undefined {
  if (options.disableNavigation) {
    return undefined;
  }
  const { toDate, pagedNavigation, numberOfMonths = 1 } = options;
  const offset = pagedNavigation ? numberOfMonths : 1;
  const month = startingMonth.startOf('month');

  if (!toDate) {
    return dayjs(month).add(offset, 'month');
  }

  const monthsDiff = toDate.diff(startingMonth, 'month');

  if (monthsDiff < numberOfMonths) {
    return undefined;
  }

  // Jump forward as the number of months when paged navigation
  return month.add(offset, 'month');
}
