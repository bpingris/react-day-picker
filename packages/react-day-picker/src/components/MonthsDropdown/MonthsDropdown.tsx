import React from 'react';
import dayjs from 'dayjs';

import { Dropdown } from 'components/Dropdown';
import { useDayPicker } from 'contexts/DayPicker';
import { MonthChangeEventHandler } from 'types/EventHandlers';

/** The props for the {@link MonthsDropdown} component. */
export interface MonthsDropdownProps {
  /** The month where the dropdown is displayed. */
  displayMonth: dayjs.Dayjs;
  onChange: MonthChangeEventHandler;
}

/** Render the dropdown to navigate between months. */
export function MonthsDropdown(props: MonthsDropdownProps): JSX.Element {
  const {
    fromDate,
    toDate,
    styles,
    locale,
    formatters: { formatMonthCaption },
    classNames,
    components,
    labels: { labelMonthDropdown }
  } = useDayPicker();

  // Dropdown should appear only when both from/toDate is set
  if (!fromDate) return <></>;
  if (!toDate) return <></>;

  const dropdownMonths: dayjs.Dayjs[] = [];

  if (fromDate.isSame(toDate, 'year')) {
    // only display the months included in the range
    const date = fromDate.startOf('month');
    for (let month = fromDate.month(); month <= toDate.month(); month++) {
      dropdownMonths.push(date.set('month', date.month()));
    }
  } else {
    // display all the 12 months
    const date = dayjs().startOf('month'); // Any date should be OK, as we just need the year
    for (let month = 0; month <= 11; month++) {
      dropdownMonths.push(date.set('month', date.month()));
    }
  }

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const selectedMonth = Number(e.target.value);
    const newMonth = props.displayMonth
      .startOf('month')
      .set('month', selectedMonth);
    props.onChange(newMonth);
  };

  const DropdownComponent = components?.Dropdown ?? Dropdown;

  return (
    <DropdownComponent
      name="months"
      aria-label={labelMonthDropdown()}
      className={classNames.dropdown_month}
      style={styles.dropdown_month}
      onChange={handleChange}
      value={props.displayMonth.month()}
      caption={formatMonthCaption(props.displayMonth, { locale })}
    >
      {dropdownMonths.map((m) => (
        <option key={m.month()} value={m.month()}>
          {formatMonthCaption(m, { locale })}
        </option>
      ))}
    </DropdownComponent>
  );
}
