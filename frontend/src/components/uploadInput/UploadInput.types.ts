export type UploadInputProps = {
  name?: string;
  type?: string;
  label?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
