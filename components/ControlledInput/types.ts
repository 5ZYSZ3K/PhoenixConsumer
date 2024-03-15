import { Control, FieldValues, Path } from "react-hook-form";

export type ControlledInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  secure?: boolean;
  placeholder?: string;
};
