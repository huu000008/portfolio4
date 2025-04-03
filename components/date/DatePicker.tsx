'use client';

import React, { useRef } from 'react';
import { useDatePicker, useDateField, useButton } from 'react-aria';
import { useDatePickerState } from '@react-stately/datepicker';
import { getLocalTimeZone, today, DateValue } from '@internationalized/date';
import { CalendarIcon } from 'lucide-react';
import Calendar from './Calendar';
import styles from './DatePicker.module.scss';

interface DatePickerProps {
  label: string;
  value: DateValue | null;
  onChange: (value: DateValue | null) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ label, value, onChange }) => {
  const state = useDatePickerState({
    value,
    onChange,
    defaultValue: today(getLocalTimeZone()),
    shouldCloseOnSelect: true,
  });

  const ref = useRef<HTMLDivElement>(null);
  const {
    groupProps,
    labelProps,
    fieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
  } = useDatePicker({}, state, ref);

  const { inputProps } = useDateField(fieldProps, state, ref);
  const { buttonProps: calendarButtonProps } = useButton(buttonProps, ref);

  return (
    <div className={styles.datepicker}>
      <label {...labelProps} className={styles.label}>
        {label}
      </label>
      <div {...groupProps} ref={ref} className={styles.inputGroup}>
        <input {...inputProps} className={styles.input} />
        <button
          {...calendarButtonProps}
          type="button"
          className={styles.iconBtn}
        >
          <CalendarIcon size={16} />
        </button>
      </div>
      {state.isOpen && (
        <div {...dialogProps} className={styles.popover}>
          <Calendar {...calendarProps} />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
