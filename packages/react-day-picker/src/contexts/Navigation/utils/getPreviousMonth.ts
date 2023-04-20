import dayjs from 'dayjs';

/**
 * Returns the next previous the user can navigate to, according to the given
 * options.
 *
 * Please note that the previous month is not always the previous calendar
 * month:
 *
 * - if before the `fromDate` date, is `undefined`;
 * - if the navigation is paged, is the number of months displayed before.
 *
 */
export function getPreviousMonth(
  startingMonth: dayjs.Dayjs,
  options: {
    numberOfMonths?: number;
    fromDate?: dayjs.Dayjs;
    pagedNavigation?: boolean;
    disableNavigation?: boolean;
  }
): dayjs.Dayjs | undefined {
  if (options.disableNavigation) {
    return undefined;
  }
  const { fromDate, pagedNavigation, numberOfMonths = 1 } = options;
  const offset = pagedNavigation ? numberOfMonths : 1;
  const month = startingMonth.startOf('month');
  if (!fromDate) {
    return month.subtract(offset, 'month');
  }
  const monthsDiff = month.diff(fromDate, 'month');

  if (monthsDiff <= 0) {
    return undefined;
  }

  // Jump back as the number of months when paged navigation
  return month.subtract(offset, 'month');
}
