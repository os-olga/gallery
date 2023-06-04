import { IImage } from "../../App.interface";

export type CarouselProps = {
  images: IImage[];
  activeImage: IImage | null;
  setActiveImage: (arg: IImage) => void;
};
