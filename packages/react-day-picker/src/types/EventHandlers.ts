import dayjs from 'dayjs';
import { DateRange } from 'types/Matchers';

import { ActiveModifiers } from './Modifiers';

/** The event handler when a day is clicked. */
export type DayClickEventHandler = (
  day: dayjs.Dayjs,
  activeModifiers: ActiveModifiers,
  e: React.MouseEvent
) => void;

/** The event handler when a day is focused. */
export type DayFocusEventHandler = (
  day: dayjs.Dayjs,
  activeModifiers: ActiveModifiers,
  e: React.FocusEvent | React.KeyboardEvent
) => void;

/** The event handler when a day gets a keyboard event. */
export type DayKeyboardEventHandler = (
  day: dayjs.Dayjs,
  activeModifiers: ActiveModifiers,
  e: React.KeyboardEvent
) => void;

/** The event handler when a day gets a mouse event. */
export type DayMouseEventHandler = (
  day: dayjs.Dayjs,
  activeModifiers: ActiveModifiers,
  e: React.MouseEvent
) => void;

/** The event handler when a day gets a pointer event. */
export type DayPointerEventHandler = (
  day: dayjs.Dayjs,
  activeModifiers: ActiveModifiers,
  e: React.PointerEvent
) => void;

/** The event handler when a month is changed in the calendar. */
export type MonthChangeEventHandler = (month: dayjs.Dayjs) => void;

/** The event handler when selecting multiple days. */
export type SelectMultipleEventHandler = (
  /** The selected days */
  days: dayjs.Dayjs[] | undefined,
  /** The day that was clicked triggering the event. */
  selectedDay: dayjs.Dayjs,
  /** The day that was clicked */
  activeModifiers: ActiveModifiers,
  /** The mouse event that triggered this event. */
  e: React.MouseEvent
) => void;

/** The event handler when selecting a range of days. */
export type SelectRangeEventHandler = (
  /** The current range of the selected days. */
  range: DateRange | undefined,
  /** The day that was selected (or clicked) triggering the event. */
  selectedDay: dayjs.Dayjs,
  /** The modifiers of the selected day. */
  activeModifiers: ActiveModifiers,
  e: React.MouseEvent
) => void;

/** The event handler when selecting a single day. */
export type SelectSingleEventHandler = (
  /** The selected day, `undefined` when `required={false}` (default) and the day is clicked again. */
  day: dayjs.Dayjs | undefined,
  /** The day that was selected (or clicked) triggering the event. */
  selectedDay: dayjs.Dayjs,
  /** The modifiers of the selected day. */
  activeModifiers: ActiveModifiers,
  e: React.MouseEvent
) => void;

/**The event handler when the week number is clicked. */
export type WeekNumberClickEventHandler = (
  /** The week number that has been clicked. */
  weekNumber: number,
  /** The dates in the clicked week. */
  dates: dayjs.Dayjs[],
  /** The mouse event that triggered this event. */
  e: React.MouseEvent
) => void;

/** The event handler when a day gets a touch event. */
export type DayTouchEventHandler = (
  day: dayjs.Dayjs,
  activeModifiers: ActiveModifiers,
  e: React.TouchEvent
) => void;
