import dayjs from 'dayjs';

import { DayPickerBase } from 'types/DayPickerBase';

/** Return the `fromDate` and `toDate` prop values values parsing the DayPicker props. */
export function parseFromToProps(
  props: Pick<
    DayPickerBase,
    'fromYear' | 'toYear' | 'fromDate' | 'toDate' | 'fromMonth' | 'toMonth'
  >
): { fromDate?: dayjs.Dayjs; toDate?: dayjs.Dayjs } {
  const { fromYear, toYear, fromMonth, toMonth } = props;
  let { fromDate, toDate } = props;

  if (fromMonth) {
    fromDate = fromMonth.startOf('month');
  } else if (fromYear) {
    fromDate = dayjs(new Date(fromYear, 0, 1));
  }

  if (toMonth) {
    toDate = toMonth.endOf('month');
  } else if (toYear) {
    toDate = dayjs(new Date(toYear, 11, 31));
  }

  return {
    fromDate: fromDate ? fromDate.startOf('day') : undefined,
    toDate: toDate ? toDate.startOf('day') : undefined
  };
}
