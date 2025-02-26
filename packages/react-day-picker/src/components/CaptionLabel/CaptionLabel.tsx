import React from 'react';

import { useDayPicker } from 'contexts/DayPicker';
import dayjs from 'dayjs';

/** The props for the {@link CaptionLabel} component. */
export interface CaptionLabelProps {
  /** The ID for the heading element. Must be the same as the labelled-by in Table. */
  id?: string;
  /** The month where the caption is displayed. */
  displayMonth: dayjs.Dayjs;
}

/** Render the caption for the displayed month. This component is used when `captionLayout="buttons"`. */
export function CaptionLabel(props: CaptionLabelProps): JSX.Element {
  const {
    classNames,
    styles,
    formatters: { formatCaption }
  } = useDayPicker();
  return (
    <div
      className={classNames.caption_label}
      style={styles.caption_label}
      aria-live="polite"
      role="presentation"
      id={props.id}
    >
      {formatCaption(props.displayMonth)}
    </div>
  );
}
