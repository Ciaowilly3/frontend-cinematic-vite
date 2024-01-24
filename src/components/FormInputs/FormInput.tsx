import React from "react";
import { setAtomicComponentStyle } from "../../utils/setAtomicComponentStyle";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

const FormInputStyle = {
  formControl: "form-control",
};

export type FormInputStyle = (keyof typeof FormInputStyle)[];

type FormInputProps = {
  type: React.HTMLInputTypeAttribute;
  style: FormInputStyle;
  id: string;
  placeholder: string;
  label: string;
  error: FieldError | undefined | Merge<FieldError, FieldErrorsImpl<any>>;
  register: any;
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
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type={type}
        className={setAtomicComponentStyle(FormInputStyle, style)}
        id={id}
        placeholder={placeholder}
        {...register(id)}
        step={step}
      />
      {error && <p className="text-danger">{`${error.message}`}</p>}
    </div>
  );
};

export default FormInput;
