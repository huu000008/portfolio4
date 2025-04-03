'use client';

import { useRef } from 'react';
import { useDatePicker, useDateInput, useButton } from 'react-aria';
import { useDatePickerState } from '@react-stately/datepicker';
import { today, getLocalTimeZone, DateValue } from '@internationalized/date';
import styles from './DatePicker.module.scss';

interface Props {
  label?: string;
  value: DateValue;
  onChange: (val: DateValue) => void;
}

export default function DatePicker({ label = '날짜', value, onChange }: Props) {
  const groupRef = useRef(null);
  const inputRef = useRef(null);

  const state = useDatePickerState({
    value,
    onChange,
    defaultValue: today(getLocalTimeZone()),
    shouldCloseOnSelect: true,
    granularity: 'day',
  });

  const {
    groupProps,
    labelProps,
    fieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
  } = useDatePicker({}, state, groupRef);

  const { inputProps } = useDateInput(fieldProps, state, inputRef);
  const { buttonProps: calendarBtnProps } = useButton(buttonProps, groupRef);

  return (
    <div className={styles.datepicker}>
      <label {...labelProps} className={styles.label}>
        {label}
      </label>
      <div {...groupProps} ref={groupRef} className={styles.inputWrap}>
        <input {...inputProps} ref={inputRef} className={styles.input} />
        <button {...calendarBtnProps} type="button" className={styles.iconBtn}>
          📅
        </button>
      </div>

      {state.isOpen && (
        <div {...dialogProps} className={styles.popover}>
          <div {...calendarProps} />
        </div>
      )}
    </div>
  );
}
