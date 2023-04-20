import { act } from '@testing-library/react';
import dayjs from 'dayjs';
import { DayPickerProps } from 'DayPicker';

import { renderDayPickerHook, RenderHookResult } from 'test/render';
import { freezeBeforeAll } from 'test/utils';

import { NavigationContextValue, useNavigation } from './NavigationContext';

const today = dayjs(new Date(2021, 11, 8));
const todaysMonth = today.startOf('month');
freezeBeforeAll(today.toDate());

function renderHook(props: Partial<DayPickerProps> = {}) {
  return renderDayPickerHook<NavigationContextValue>(useNavigation, props);
}

let result: RenderHookResult<NavigationContextValue>;
describe('when rendered', () => {
  beforeEach(() => {
    result = renderHook();
  });
  test('the current month should be the today`s month', () => {
    expect(result.current.currentMonth).toEqual(todaysMonth);
  });
  test('the display months should be the today`s month', () => {
    expect(result.current.displayMonths).toEqual([todaysMonth]);
  });
  test('the previous month should be the month before today`s month', () => {
    expect(result.current.previousMonth).toEqual(
      todaysMonth.subtract(1, 'month')
    );
  });
  test('the next month should be the month after today`s month', () => {
    expect(result.current.nextMonth).toEqual(todaysMonth.add(1, 'month'));
  });
  describe('when goToMonth is called', () => {
    const newMonth = todaysMonth.add(10, 'month');
    beforeEach(() => {
      result = renderHook();
      act(() => result.current.goToMonth(newMonth));
    });
    test('should go to the specified month', () => {
      expect(result.current.currentMonth).toEqual(newMonth);
    });
    test('the display months should be the today`s month', () => {
      expect(result.current.displayMonths).toEqual([newMonth]);
    });
    test('the previous month should be the month before today`s month', () => {
      expect(result.current.previousMonth).toEqual(
        newMonth.subtract(1, 'month')
      );
    });
    test('the next month should be the month after today`s month', () => {
      expect(result.current.nextMonth).toEqual(newMonth.add(1, 'month'));
    });
  });
  describe('when goToDate is called with a date from another month', () => {
    const newDate = today.add(10, 'month');
    const onMonthChange = jest.fn();
    beforeEach(() => {
      result = renderHook({ onMonthChange });
      act(() => result.current.goToDate(newDate));
    });
    test('should go to the specified month', () => {
      const date = newDate.startOf('month');
      expect(result.current.currentMonth).toEqual(date);
      expect(onMonthChange).toHaveBeenCalledWith(date);
    });
  });
  describe('when isDateDisplayed is called', () => {
    describe('with a date in the calendar', () => {
      test('should return true', () => {
        expect(result.current.isDateDisplayed(today)).toBe(true);
      });
    });
    describe('with a date not in the calendar', () => {
      test('should return false', () => {
        expect(result.current.isDateDisplayed(today.add(1, 'month'))).toBe(
          false
        );
      });
    });
  });
});

const numberOfMonths = 2;
describe('when the number of months is ${numberOfMonths}', () => {
  beforeEach(() => {
    result = renderHook({ numberOfMonths: 2 });
  });
  test('the current month should be the today`s month', () => {
    expect(result.current.currentMonth).toEqual(todaysMonth);
  });
  test('the display months should be the today`s and next month', () => {
    expect(result.current.displayMonths).toEqual([
      todaysMonth,
      todaysMonth.add(1, 'month')
    ]);
  });
  test('the previous month should be the month before today`s month', () => {
    expect(result.current.previousMonth).toEqual(
      todaysMonth.subtract(1, 'month')
    );
  });
  test('the next month should be the month after today`s month', () => {
    expect(result.current.nextMonth).toEqual(todaysMonth.add(1, 'month'));
  });
});

describe(`when the number of months is ${numberOfMonths} and the navigation is paged`, () => {
  beforeEach(() => {
    result = renderHook({ numberOfMonths, pagedNavigation: true });
  });
  test('the current month should be the today`s month', () => {
    expect(result.current.currentMonth).toEqual(todaysMonth);
  });
  test('the display months should be the today`s and next month', () => {
    expect(result.current.displayMonths).toEqual([
      todaysMonth,
      todaysMonth.add(1, 'month')
    ]);
  });
  test(`the previous month should be the ${numberOfMonths} months before today's month`, () => {
    expect(result.current.previousMonth).toEqual(
      todaysMonth.subtract(numberOfMonths, 'month')
    );
  });
  test(`the next month should be ${numberOfMonths} months after today's month`, () => {
    expect(result.current.nextMonth).toEqual(
      todaysMonth.add(numberOfMonths, 'month')
    );
  });
});
