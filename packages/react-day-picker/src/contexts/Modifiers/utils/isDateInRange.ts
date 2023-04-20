import dayjs from 'dayjs';

import { DateRange } from 'types/Matchers';

/** Return `true` whether `date` is inside `range`. */
export function isDateInRange(date: dayjs.Dayjs, range: DateRange): boolean {
  let { from, to } = range;
  if (!from) {
    return false;
  }
  if (!to && from.isSame(date, 'day')) {
    return true;
  }
  if (!to) {
    return false;
  }
  const isRangeInverted = to.diff(from, 'day') < 0;
  if (isRangeInverted) {
    [from, to] = [to, from];
  }
  const isInRange = date.diff(from, 'day') >= 0 && to.diff(date, 'day') >= 0;
  return isInRange;
}
