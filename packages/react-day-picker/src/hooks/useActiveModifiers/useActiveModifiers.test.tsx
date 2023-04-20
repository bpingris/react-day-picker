import dayjs from 'dayjs';

import { renderDayPickerHook } from 'test/render';

import { ActiveModifiers } from 'types/Modifiers';

import { useActiveModifiers } from './useActiveModifiers';

const date = dayjs(new Date(2010, 5, 23));

describe('when in the same month', () => {
  const displayMonth = date;
  test('should return the active modifiers', () => {
    const result = renderDayPickerHook<ActiveModifiers>(() =>
      useActiveModifiers(date, displayMonth)
    );
    expect(result).toBeDefined();
  });
});

describe('when not in the same display month', () => {
  const displayMonth = date.add(1, 'month');
  test('should return the outside modifier', () => {
    const result = renderDayPickerHook<ActiveModifiers>(() =>
      useActiveModifiers(date, displayMonth)
    );
    expect(result.current.outside).toBe(true);
  });
});
