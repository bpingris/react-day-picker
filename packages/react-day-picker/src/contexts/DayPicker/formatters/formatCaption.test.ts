import { formatCaption } from './formatCaption';
import dayjs from 'dayjs';

const date = dayjs(new Date(2022, 10, 21));

test('should return the formatted caption', () => {
  expect(formatCaption(date)).toEqual('November 2022');
});
