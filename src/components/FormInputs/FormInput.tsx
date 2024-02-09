import React from 'react';
import { setAtomicComponentStyle } from '../../utils/setAtomicComponentStyle';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import _ from 'lodash';

const FormInputStyle = {
  formControl: 'form-control',
  checkBox: 'form-check-input',
};

export type FormInputStyle = (keyof typeof FormInputStyle)[];

type FormInputProps = {
  type: React.HTMLInputTypeAttribute;
  style: FormInputStyle;
  id: string;
  placeholder: string;
  label: string;
  error?:
    | FieldError
    | Merge<
        FieldError,
        (
          | Merge<FieldError, FieldErrorsImpl<{ genre: { genreName: string } }>>
          | undefined
        )[]
      >
    | undefined;
  register?: any;
  step?: number;
};

const FormInput = ({
  type,
  style,
  id,
  placeholder,
  label,
  error,
  register,
  step,
}: FormInputProps) => {
  return (
    <>
      {label ? (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      ) : null}
      <input
        key={_.uniqueId()}
        type={type}
        className={setAtomicComponentStyle(FormInputStyle, style)}
        id={id}
        placeholder={placeholder}
        {...(register && register(id))}
        step={step}
      />
      {error && <p className="text-danger">{`${error.message}`}</p>}
    </>
  );
};
export default FormInput;
