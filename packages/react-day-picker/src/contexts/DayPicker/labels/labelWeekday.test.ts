import dayjs from 'dayjs';

import { labelWeekday } from './labelWeekday';

const weekDay = dayjs(new Date(2022, 10, 21));

test('should return the formatted weekday name', () => {
  expect(labelWeekday(weekDay)).toEqual('Monday');
});

describe('when a locale is passed in', () => {
  test('should format using the locale', () => {
    expect(labelWeekday(weekDay)).toEqual('Monday');
  });
});
