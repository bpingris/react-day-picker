import dayjs from 'dayjs';

/**
 * The default formatter for the Month caption.
 */
export function formatMonthCaption(month: dayjs.Dayjs): string {
  return month.format('YYYY');
}
