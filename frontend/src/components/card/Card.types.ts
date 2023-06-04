import { IImage } from "../../App.interface";

export type CardProps = {
  id: number;
  description: string | null;
  imgSrc: string;
  filename?: string;
  activeImage?: IImage | null;
  removeImage: (arg: number) => void;
  onClick?: () => void;
};
