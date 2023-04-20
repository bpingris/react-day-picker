import React from 'react';
import dayjs from 'dayjs';

import { IconLeft } from 'components/IconLeft';
import { IconRight } from 'components/IconRight';
import { useDayPicker } from 'contexts/DayPicker';

import { Button } from '../Button';

/** The props for the {@link Navigation} component. */
export interface NavigationProps {
  /** The month where the caption is displayed. */
  displayMonth: dayjs.Dayjs;
  /** The previous month. */
  previousMonth?: dayjs.Dayjs;
  /** The next month. */
  nextMonth?: dayjs.Dayjs;
  /** Hide the previous button. */
  hidePrevious: boolean;
  /** Hide the next button. */
  hideNext: boolean;
  /** Event handler when the next button is clicked. */
  onNextClick: React.MouseEventHandler<HTMLButtonElement>;
  /** Event handler when the previous button is clicked. */
  onPreviousClick: React.MouseEventHandler<HTMLButtonElement>;
}

/** A component rendering the navigation buttons or the drop-downs. */
export function Navigation(props: NavigationProps): JSX.Element {
  const {
    dir,
    classNames,
    styles,
    labels: { labelPrevious, labelNext },
    components
  } = useDayPicker();

  if (!props.nextMonth && !props.previousMonth) {
    return <></>;
  }

  const previousLabel = labelPrevious(props.previousMonth);
  const previousClassName = [
    classNames.nav_button,
    classNames.nav_button_previous
  ].join(' ');

  const nextLabel = labelNext(props.nextMonth);
  const nextClassName = [
    classNames.nav_button,
    classNames.nav_button_next
  ].join(' ');

  const IconRightComponent = components?.IconRight ?? IconRight;
  const IconLeftComponent = components?.IconLeft ?? IconLeft;
  return (
    <div className={classNames.nav} style={styles.nav}>
      {!props.hidePrevious && (
        <Button
          name="previous-month"
          aria-label={previousLabel}
          className={previousClassName}
          style={styles.nav_button_previous}
          disabled={!props.previousMonth}
          onClick={props.onPreviousClick}
        >
          {dir === 'rtl' ? (
            <IconRightComponent
              className={classNames.nav_icon}
              style={styles.nav_icon}
            />
          ) : (
            <IconLeftComponent
              className={classNames.nav_icon}
              style={styles.nav_icon}
            />
          )}
        </Button>
      )}
      {!props.hideNext && (
        <Button
          name="next-month"
          aria-label={nextLabel}
          className={nextClassName}
          style={styles.nav_button_next}
          disabled={!props.nextMonth}
          onClick={props.onNextClick}
        >
          {dir === 'rtl' ? (
            <IconLeftComponent
              className={classNames.nav_icon}
              style={styles.nav_icon}
            />
          ) : (
            <IconRightComponent
              className={classNames.nav_icon}
              style={styles.nav_icon}
            />
          )}
        </Button>
      )}
    </div>
  );
}
