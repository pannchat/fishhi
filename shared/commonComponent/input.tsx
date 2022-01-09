import React, { InputHTMLAttributes, RefObject } from 'react';
import { CSSProperties } from 'styled-components';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelStyle?: CSSProperties;
  alignDirection?: 'row' | 'col';
  ref?: RefObject<HTMLInputElement>;
  style?: CSSProperties;
  // placeholder?: string;
  // style?: CSSProperties;
  // onChange?: (e?: any) => void;
  // onFocus?: (value?: any) => void;
  // onBlur?: (value?: any) => void;
}

const Input = (props: IInputProps) => {
  const { label, labelStyle, alignDirection, width, ...inputProps } = props;
  return (
    <div
      style={{
        width: width,
        flexBasis: props.style?.flexBasis,
      }}
    >
      {label && (
        <label htmlFor={inputProps.name} style={labelStyle}>
          {label}
        </label>
      )}
      <input {...inputProps} />
    </div>
  );
};

export default Input;
