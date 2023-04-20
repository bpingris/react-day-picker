import dayjs from 'dayjs';

import { getInitialMonth } from './getInitialMonth';

describe('when no toDate is given', () => {
  describe('when month is in context', () => {
    const month = dayjs(new Date(2010, 11, 12));
    it('return that month', () => {
      const initialMonth = getInitialMonth({ month });
      expect(initialMonth.isSame(month, 'month')).toBe(true);
    });
  });
  describe('when defaultMonth is in context', () => {
    const defaultMonth = dayjs(new Date(2010, 11, 12));
    it('return that month', () => {
      const initialMonth = getInitialMonth({ defaultMonth });
      expect(initialMonth.isSame(defaultMonth, 'month')).toBe(true);
    });
  });
  describe('when no month or defaultMonth are in context', () => {
    const today = dayjs(new Date(2010, 11, 12));
    it('return the today month', () => {
      const initialMonth = getInitialMonth({ today });
      expect(initialMonth.isSame(today, 'month')).toBe(true);
    });
  });
});
describe('when toDate is given', () => {
  describe('when toDate is before the default initial date', () => {
    const month = dayjs(new Date(2010, 11, 12));
    const toDate = month.subtract(2, 'month');
    describe('when the number of month is 1', () => {
      const numberOfMonths = 1;
      it('return the toDate', () => {
        const initialMonth = getInitialMonth({
          month,
          toDate,
          numberOfMonths
        });
        expect(initialMonth.isSame(toDate, 'month')).toBe(true);
      });
    });
    describe('when the number of month is 3', () => {
      const numberOfMonths = 3;
      it('return the toDate plus the number of months', () => {
        const initialMonth = getInitialMonth({
          month,
          toDate,
          numberOfMonths
        });
        const expectedMonth = toDate.subtract(
          1 * (numberOfMonths - 1),
          'month'
        );
        expect(initialMonth.isSame(expectedMonth, 'month')).toBe(true);
      });
    });
  });
});
