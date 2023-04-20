import { act } from '@testing-library/react';
import dayjs from 'dayjs';
import { DayPickerProps } from 'DayPicker';

import { renderDayPickerHook } from 'test/render';
import { freezeBeforeAll } from 'test/utils';

import { NavigationState, useNavigationState } from './useNavigationState';

const today = dayjs(new Date(2021, 11, 8));
freezeBeforeAll(today.toDate());

function renderHook(props: Partial<DayPickerProps> = {}) {
  return renderDayPickerHook<NavigationState>(useNavigationState, props);
}

describe('when goToMonth is called', () => {
  test('should set the month in state', () => {
    const onMonthChange = jest.fn();
    const result = renderHook({ onMonthChange });
    const month = today.add(2, 'month');
    act(() => result.current[1](month));
    expect(result.current[0]).toEqual(month.startOf('month'));
    expect(onMonthChange).toHaveBeenCalledWith(month.startOf('month'));
  });
  describe('when navigation is disabled', () => {
    test('should not set the month in state', () => {
      const onMonthChange = jest.fn();
      const result = renderHook({ disableNavigation: true, onMonthChange });
      const month = today.add(2, 'month');
      result.current[1](month);
      expect(result.current[0]).toEqual(today.startOf('month'));
      expect(onMonthChange).not.toHaveBeenCalled();
    });
  });
});
