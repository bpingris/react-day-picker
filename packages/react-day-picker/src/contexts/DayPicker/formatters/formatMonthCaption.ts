import type { Locale } from 'date-fns';
import { format } from 'date-fns';

/**
 * The default formatter for the Month caption.
 */
export function formatMonthCaption(
  month: Date,
  options?: { locale?: Locale }
): string {
  return format(month, 'LLLL', options);
}
