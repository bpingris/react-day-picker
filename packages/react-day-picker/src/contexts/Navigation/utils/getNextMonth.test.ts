import dayjs from 'dayjs';

import { getNextMonth } from './getNextMonth';

const startingMonth = dayjs(new Date(2020, 4, 31));

describe('when number of months is 1', () => {
  describe('when the navigation is disabled', () => {
    const disableNavigation = true;
    it('the next month is undefined', () => {
      const result = getNextMonth(startingMonth, { disableNavigation });
      expect(result).toBe(undefined);
    });
  });
  describe('when in the navigable range', () => {
    const toDate = startingMonth.add(3, 'month');
    it('the next month is not undefined', () => {
      const result = getNextMonth(startingMonth, { toDate });
      const expectedNextMonth = startingMonth.add(1, 'month');
      expect(result && result.isSame(expectedNextMonth, 'month')).toBeTruthy();
    });
  });
  describe('when not in the navigable range', () => {
    const toDate = startingMonth;
    it('the next month is undefined', () => {
      const result = getNextMonth(startingMonth, { toDate });
      expect(result).toBe(undefined);
    });
  });
});
describe('when displaying 3 months', () => {
  const numberOfMonths = 3;
  describe('when the navigation is paged', () => {
    const pagedNavigation = true;
    it('the next month is 3 months ahead', () => {
      const result = getNextMonth(startingMonth, {
        numberOfMonths,
        pagedNavigation
      });
      const expectedNextMonth = startingMonth.add(3, 'month');
      expect(result && result.isSame(expectedNextMonth, 'month')).toBeTruthy();
    });
    describe('when the to-date is ahead less than 3 months', () => {
      it('the next month is undefined', () => {
        const result = getNextMonth(startingMonth, {
          numberOfMonths,
          pagedNavigation,
          toDate: startingMonth.add(1, 'month')
        });
        expect(result).toBe(undefined);
      });
    });
  });
  describe('when the navigation is not paged', () => {
    const pagedNavigation = false;
    it('the next month is 1 months ahead', () => {
      const result = getNextMonth(startingMonth, {
        numberOfMonths,
        pagedNavigation
      });
      const expectedNextMonth = startingMonth.add(1, 'month');
      expect(result && result.isSame(expectedNextMonth, 'month')).toBeTruthy();
    });
    describe('when the to-date is ahead less than 3 months', () => {
      it('the next month is undefined', () => {
        const result = getNextMonth(startingMonth, {
          numberOfMonths,
          pagedNavigation,
          toDate: startingMonth.add(1, 'month')
        });
        expect(result).toBe(undefined);
      });
    });
  });
});
