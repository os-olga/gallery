import { ReactNode } from "react";

export type PopupProps = {
  isOpen: boolean;
  onClose: () => void;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
};
