import { labelDay } from './labelDay';
import dayjs from 'dayjs';

const day = dayjs(new Date(2022, 10, 21));

test('should return the day label', () => {
  expect(labelDay(day)).toEqual('21 November (Monday)');
});
