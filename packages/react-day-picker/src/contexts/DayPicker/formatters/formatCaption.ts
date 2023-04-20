import dayjs from 'dayjs';

/**
 * The default formatter for the caption.
 */
export function formatCaption(month: dayjs.Dayjs): string {
  return month.format('MMMM YYYY');
}
