import { isAfter, isBefore, isSameDay } from 'date-fns';
import dayjs from 'dayjs';

import { DateRange } from 'types/Matchers';

/**
 * Add a day to an existing range.
 *
 * The returned range takes in account the `undefined` values and if the added
 * day is already present in the range.
 */
export function addToRange(
  day: dayjs.Dayjs,
  range?: DateRange
): DateRange | undefined {
  const { from, to } = range || {};
  if (!from) {
    return { from: day, to: undefined };
  }
  if (!to && from.isSame(day, 'day')) {
    return { from: from, to: day };
  }
  if (!to && day.isBefore(from)) {
    return { from: day, to: from };
  }
  if (!to) {
    return { from, to: day };
  }
  if (to.isSame(day) && from.isSame(day)) {
    return undefined;
  }
  if (to.isSame(day)) {
    return { from: to, to: undefined };
  }
  if (from.isSame(day)) {
    return undefined;
  }
  if (from.isAfter(day)) {
    return { from: day, to };
  }
  return { from, to: day };
}
