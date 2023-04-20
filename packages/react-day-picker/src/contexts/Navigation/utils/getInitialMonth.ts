import { DayPickerContextValue } from 'contexts/DayPicker';
import dayjs from 'dayjs';

/** Return the initial month according to the given options. */
export function getInitialMonth(
  context: Partial<DayPickerContextValue>
): dayjs.Dayjs {
  const { month, defaultMonth, today } = context;
  let initialMonth = month || defaultMonth || today || dayjs();

  const { toDate, fromDate, numberOfMonths = 1 } = context;

  // Fix the initialMonth if is after the to-date
  if (toDate && toDate.diff(initialMonth, 'month') < 0) {
    const offset = -1 * (numberOfMonths - 1);
    initialMonth = toDate.add(offset, 'month');
  }
  // Fix the initialMonth if is before the from-date
  if (fromDate && initialMonth.diff(fromDate, 'month') < 0) {
    initialMonth = fromDate;
  }
  return initialMonth.startOf('month');
}
