import React from 'react';
import './Input.scss';

import TextareaAutosize from 'react-autosize-textarea';

export type InputProps = {
  id?: string;
  name?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  onChange?: () => void;
  forwardRef?: React.Ref<HTMLTextAreaElement & HTMLInputElement>;
  resizable?: boolean;
  minHeight?: number;
  onResize?: () => void;
  state?: 'normal' | 'success' | 'error';
  onKeyDown?: () => void;
  disabled?: boolean;
};

export default function Input({
  id, label, name, value, placeholder,
  required, type = 'text', onChange, forwardRef,
  resizable, minHeight = 46, onResize, state = 'normal',
  onKeyDown, disabled,
}: InputProps) {
  return (
    <div className="input-container">
      { label !== '' && <label className="input__label text-b2" htmlFor={id}>{label}</label> }
      { resizable
        ? (
          <TextareaAutosize
            style={{ minHeight: `${minHeight}px` }}
            name={name}
            id={id}
            className={`input input--resizable${state !== 'normal' ? ` input--${state}` : ''}`}
            ref={forwardRef}
            type={type}
            placeholder={placeholder}
            required={required}
            defaultValue={value}
            autoComplete="off"
            onChange={onChange}
            onResize={onResize}
            onKeyDown={onKeyDown}
            disabled={disabled}
          />
        ) : (
          <input
            ref={forwardRef}
            id={id}
            name={name}
            className={`input ${state !== 'normal' ? ` input--${state}` : ''}`}
            type={type}
            placeholder={placeholder}
            required={required}
            defaultValue={value}
            autoComplete="off"
            onChange={onChange}
            onKeyDown={onKeyDown}
            disabled={disabled}
          />
        )}
    </div>
  );
}
