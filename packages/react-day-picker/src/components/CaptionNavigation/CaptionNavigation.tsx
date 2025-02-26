import React from 'react';

import { CaptionProps } from 'components/Caption/Caption';
import { Navigation } from 'components/Navigation';
import { useDayPicker } from 'contexts/DayPicker';
import { useNavigation } from 'contexts/Navigation';

/**
 * Render a caption with a button-based navigation.
 */
export function CaptionNavigation(props: CaptionProps): JSX.Element {
  const { numberOfMonths } = useDayPicker();
  const { previousMonth, nextMonth, goToMonth, displayMonths } =
    useNavigation();

  const displayIndex = displayMonths.findIndex((month) =>
    props.displayMonth.isSame(month, 'month')
  );

  const isFirst = displayIndex === 0;
  const isLast = displayIndex === displayMonths.length - 1;

  const hideNext = numberOfMonths > 1 && (isFirst || !isLast);
  const hidePrevious = numberOfMonths > 1 && (isLast || !isFirst);

  const handlePreviousClick: React.MouseEventHandler = () => {
    if (!previousMonth) return;
    goToMonth(previousMonth);
  };

  const handleNextClick: React.MouseEventHandler = () => {
    if (!nextMonth) return;
    goToMonth(nextMonth);
  };

  return (
    <Navigation
      displayMonth={props.displayMonth}
      hideNext={hideNext}
      hidePrevious={hidePrevious}
      nextMonth={nextMonth}
      previousMonth={previousMonth}
      onPreviousClick={handlePreviousClick}
      onNextClick={handleNextClick}
    />
  );
}
