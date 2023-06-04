import React from "react";
import classNames from "classnames";

import { IImage } from "../../App.interface";

import { baseURL } from "../../api/axios";

import { CarouselProps } from "./Carousel.types";

import styles from "./Carousel.module.css";

export const CarouselComponent: React.FC<CarouselProps> = ({
  images,
  activeImage,
  setActiveImage,
}) => {
  const activeIndex = images.findIndex(
    (image: IImage) => image.id === activeImage?.id
  );

  const nextSlide = () => {
    let index = activeIndex + 1;

    if (index > images.length - 1) {
      index = 0;
    }

    setActiveImage(images[index]);
  };

  const prevSlide = () => {
    let index = activeIndex - 1;

    if (index < 0) {
      index = images.length - 1;
    }

    setActiveImage(images[index]);
  };

  return (
    <div className={styles.carousel}>
      {images.length > 0 && (
        <>
          <img src={`${baseURL}/files/${activeImage?.filename}`} alt="" />

          <button
            onClick={prevSlide}
            className={classNames(styles.arrow, styles.left)}
          ></button>

          <button
            onClick={nextSlide}
            className={classNames(styles.arrow, styles.right)}
          ></button>
        </>
      )}
    </div>
  );
};
