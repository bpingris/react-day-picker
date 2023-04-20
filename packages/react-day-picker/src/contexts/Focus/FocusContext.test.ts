import { act } from '@testing-library/react';

import dayjs from 'dayjs';

import { renderDayPickerHook, RenderHookResult } from 'test/render';
import { freezeBeforeAll } from 'test/utils';

import { FocusContextValue, useFocusContext } from 'contexts/Focus';

const today = new Date(2021, 11, 8); // make sure is in the middle of the week for the complete test
freezeBeforeAll(today);

function renderHook() {
  return renderDayPickerHook<FocusContextValue>(useFocusContext);
}

type HookFunction =
  | 'focusDayAfter'
  | 'focusDayBefore'
  | 'focusWeekAfter'
  | 'focusWeekBefore'
  | 'focusMonthBefore'
  | 'focusMonthAfter'
  | 'focusYearBefore'
  | 'focusYearAfter'
  | 'focusStartOfWeek'
  | 'focusEndOfWeek';

test('`focusedDay` should be undefined', () => {
  const result = renderHook();
  expect(result.current.focusedDay).toBeUndefined();
});

const tests: Array<HookFunction> = [
  'focusDayAfter',
  'focusDayBefore',
  'focusWeekAfter',
  'focusWeekBefore',
  'focusMonthBefore',
  'focusMonthAfter',
  'focusYearBefore',
  'focusYearAfter',
  'focusStartOfWeek',
  'focusEndOfWeek'
];
describe.each(tests)('when calling %s', (fn: HookFunction) => {
  test('`focusedDay` should be undefined', () => {
    const result = renderHook();
    result.current[fn];
    expect(result.current.focusedDay).toBeUndefined();
  });
});

describe('when a day is focused', () => {
  const day = today;
  let result: RenderHookResult<FocusContextValue>;
  beforeEach(() => {
    result = renderHook();
    act(() => result.current.focus(day));
  });
  test('should set the focused day', () => {
    expect(result.current.focusedDay).toEqual(day);
  });
  describe('when "focusDayBefore" is called', () => {
    const dayBefore = dayjs(day).subtract(1, 'day');
    beforeEach(() => act(() => result.current.focusDayBefore()));
    test('should focus the day before', () => {
      expect(result.current.focusedDay).toEqual(dayBefore.toDate());
    });
    test.todo('should call the navigation goToDate');
  });
  describe('when "focusDayAfter" is called', () => {
    beforeEach(() => act(() => result.current.focusDayAfter()));
    test('should focus the day after', () => {
      const dayAfter = dayjs(day).add(1, 'day');
      expect(result.current.focusedDay).toEqual(dayAfter.toDate());
    });
    test.todo('should call the navigation goToDate');
  });
  describe('when "focusWeekBefore" is called', () => {
    beforeEach(() => act(() => result.current.focusWeekBefore()));
    test('should focus the day in the previous week', () => {
      const prevWeek = dayjs(day).subtract(1, 'week');
      expect(result.current.focusedDay).toEqual(prevWeek.toDate());
    });
    test.todo('should call the navigation goToDate');
  });
  describe('when "focusWeekAfter" is called', () => {
    beforeEach(() => act(() => result.current.focusWeekAfter()));
    test('should focus the day in the next week', () => {
      const nextWeek = dayjs(day).add(1, 'week');
      expect(result.current.focusedDay).toEqual(nextWeek.toDate());
    });
    test.todo('should call the navigation goToDate');
  });
  describe('when "focusStartOfWeek" is called', () => {
    beforeEach(() => act(() => result.current.focusStartOfWeek()));
    test('should focus the first day of the week', () => {
      const firstDayOfWeek = dayjs(day).startOf('week');
      expect(result.current.focusedDay).toEqual(firstDayOfWeek.toDate());
    });
    test.todo('should call the navigation goToDate');
  });
  describe('when "focusEndOfWeek" is called', () => {
    beforeEach(() => act(() => result.current.focusEndOfWeek()));
    test('should focus the last day of the week', () => {
      const lastDayOfWeek = dayjs(day).endOf('week');
      expect(result.current.focusedDay).toEqual(lastDayOfWeek.toDate());
    });
    test.todo('should call the navigation goToDate');
  });
  describe('when "focusMonthBefore" is called', () => {
    beforeEach(() => act(() => result.current.focusMonthBefore()));
    test('should focus the day in the month before', () => {
      const monthBefore = dayjs(day).subtract(1, 'month');
      expect(result.current.focusedDay).toEqual(monthBefore.toDate());
    });
    test.todo('should call the navigation goToDate');
  });
  describe('when "focusMonthAfter" is called', () => {
    beforeEach(() => act(() => result.current.focusMonthAfter()));
    test('should focus the day in the month after', () => {
      const monthAfter = dayjs(day).add(1, 'month');
      expect(result.current.focusedDay).toEqual(monthAfter.toDate());
    });
    test.todo('should call the navigation goToDate');
  });
  describe('when "focusYearBefore" is called', () => {
    beforeEach(() => act(() => result.current.focusYearBefore()));
    test('should focus the day in the year before', () => {
      const prevYear = dayjs(day).subtract(1, 'year');
      expect(result.current.focusedDay).toEqual(prevYear.toDate());
    });
    test.todo('should call the navigation goToDate');
  });
  describe('when "focusYearAfter" is called', () => {
    beforeEach(() => act(() => result.current.focusYearAfter()));
    test('should focus the day in the year after', () => {
      const nextYear = dayjs(day).add(1, 'year');
      expect(result.current.focusedDay).toEqual(nextYear.toDate());
    });
    test.todo('should call the navigation goToDate');
  });
  describe('when blur is called', () => {
    beforeEach(() => act(() => result.current.blur()));
    test('`focusedDay` should be undefined', () => {
      expect(result.current.focusedDay).toBeUndefined();
    });
  });
});
