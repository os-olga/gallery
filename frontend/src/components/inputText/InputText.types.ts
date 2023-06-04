export type InputProps = {
  name?: string;
  value: string;
  type?: string;
  label?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  maxLength?: number;
};
