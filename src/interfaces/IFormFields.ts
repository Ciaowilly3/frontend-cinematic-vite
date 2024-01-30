import { FormInputStyle } from "../components/FormInputs/FormInput";

export interface IFormField<T> {
  name: keyof T;
  label: string;
  id: string;
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  step?: number;
  style: FormInputStyle;
}

export type IFormFields<T> = IFormField<T>[];
