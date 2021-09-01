import { UseFormRegister, RegisterOptions, FieldError, DeepMap } from 'react-hook-form';

// file component
type InputProps = {
  label: {
    name: string,
    label: string,
  };
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  errors?: DeepMap<any, FieldError>
  type?: "text" | "password" | "date" | "time" | "number" | "datetime-local";
}
// file styles
type stylesState = {
  formControl: string;
  label: string;
  input: string;
  error: string;
};
type stylesProps = {
  error: boolean
}

export type { InputProps, stylesState, stylesProps };