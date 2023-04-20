import dayjs from 'dayjs';

import { getActiveModifiers } from 'contexts/Modifiers';
import { Modifiers } from 'types/Modifiers';

/**
 * Returns the day that should be the target of the focus when DayPicker is
 * rendered the first time.
 *
 * TODO: this function doesn't consider if the day is outside the month. We
 * implemented this check in `useDayRender` but it should probably go here. See
 * https://github.com/gpbl/react-day-picker/pull/1576
 */
export function getInitialFocusTarget(
  displayMonths: dayjs.Dayjs[],
  modifiers: Modifiers
) {
  const firstDayInMonth = displayMonths[0].startOf('month');
  const lastDayInMonth = displayMonths[displayMonths.length - 1].endOf('month');

  // TODO: cleanup code
  let firstFocusableDay;
  let today;
  let date = firstDayInMonth;
  while (date <= lastDayInMonth) {
    const activeModifiers = getActiveModifiers(date, modifiers);
    const isFocusable = !activeModifiers.disabled && !activeModifiers.hidden;
    if (!isFocusable) {
      date = date.add(1, 'day');
      continue;
    }
    if (activeModifiers.selected) {
      return date;
    }
    if (activeModifiers.today && !today) {
      today = date;
    }
    if (!firstFocusableDay) {
      firstFocusableDay = date;
    }
    date = date.add(1, 'day');
  }
  if (today) {
    return today;
  } else {
    return firstFocusableDay;
  }
}
