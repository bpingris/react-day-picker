import React from 'react';

import { setYear, startOfMonth, startOfYear } from 'date-fns';
import dayjs from 'dayjs';

import { Dropdown } from 'components/Dropdown';
import { useDayPicker } from 'contexts/DayPicker';
import { MonthChangeEventHandler } from 'types/EventHandlers';

/**
 * The props for the {@link YearsDropdown} component.
 */
export interface YearsDropdownProps {
  /** The month where the drop-down is displayed. */
  displayMonth: dayjs.Dayjs;
  /** Callback to handle the `change` event. */
  onChange: MonthChangeEventHandler;
}

/**
 * Render a dropdown to change the year. Take in account the `nav.fromDate` and
 * `toDate` from context.
 */
export function YearsDropdown(props: YearsDropdownProps): JSX.Element {
  const { displayMonth } = props;
  const {
    fromDate,
    toDate,
    locale,
    styles,
    classNames,
    components,
    formatters: { formatYearCaption },
    labels: { labelYearDropdown }
  } = useDayPicker();

  const years: dayjs.Dayjs[] = [];

  // Dropdown should appear only when both from/toDate is set
  if (!fromDate) return <></>;
  if (!toDate) return <></>;

  const fromYear = fromDate.year();
  const toYear = toDate.year();
  for (let year = fromYear; year <= toYear; year++) {
    years.push(dayjs().startOf('year').set('year', year));
  }

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const newMonth = displayMonth
      .startOf('month')
      .set('year', Number(e.target.value));
    props.onChange(newMonth);
  };

  const DropdownComponent = components?.Dropdown ?? Dropdown;

  return (
    <DropdownComponent
      name="years"
      aria-label={labelYearDropdown()}
      className={classNames.dropdown_year}
      style={styles.dropdown_year}
      onChange={handleChange}
      value={displayMonth.year()}
      caption={formatYearCaption(displayMonth, { locale })}
    >
      {years.map((year) => (
        <option key={year.year()} value={year.year()}>
          {formatYearCaption(year, { locale })}
        </option>
      ))}
    </DropdownComponent>
  );
}
