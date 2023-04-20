import { getActiveModifiers, useModifiers } from 'contexts/Modifiers';
import dayjs from 'dayjs';
import { ActiveModifiers } from 'types/Modifiers';

/**
 * Return the active modifiers for the specified day.
 *
 * This hook is meant to be used inside internal or custom components.
 *
 * @param day
 * @param displayMonth
 */
export function useActiveModifiers(
  day: dayjs.Dayjs,
  /**
   * The month where the date is displayed. If not the same as `date`, the day
   * is an "outside day".
   */
  displayMonth?: dayjs.Dayjs
): ActiveModifiers {
  const modifiers = useModifiers();
  const activeModifiers = getActiveModifiers(day, modifiers, displayMonth);
  return activeModifiers;
}
