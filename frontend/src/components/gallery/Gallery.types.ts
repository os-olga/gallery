import { IImage } from "../../App.interface";

export type GalleryProps = {
  images: IImage[];
  removeImage: (arg: number) => void;
};
