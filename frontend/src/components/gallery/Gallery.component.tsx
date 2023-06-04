import { useState } from "react";

import { IImage } from "../../App.interface";
import { CardComponent } from "../card/Card.component";
import { CarouselComponent } from "../carousel/Carousel.component";
import { PopupComponent } from "../popup/Popup.component";

import { baseURL } from "../../api/axios";

import { GalleryProps } from "./Gallery.types";

import styles from "./Gallery.module.css";

export const GalleryComponent: React.FC<GalleryProps> = ({
  images,
  removeImage,
}) => {
  const [selectedImage, setSelectedImage] = useState<IImage | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const openFullscreen = (image: IImage) => {
    setSelectedImage(image);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  return (
    <div className={styles.section}>
      {images.length === 0 ? (
        <p className={styles.caption}>Please upload your images</p>
      ) : (
        <div>
          <p className={styles.caption}>Gallery</p>
          <p className={styles.tip}>
            you can click on the image and a carousel will open
          </p>
        </div>
      )}
      <div className={styles.gallery}>
        {images &&
          images.map((item: IImage) => {
            return (
              <CardComponent
                removeImage={removeImage}
                key={item.id}
                id={item.id}
                description={item.description}
                imgSrc={`${baseURL}/files/${item.filename}`}
                onClick={() => openFullscreen(item)}
                activeImage={selectedImage}
              />
            );
          })}
      </div>

      {isFullscreen && (
        <div className="fullscreen">
          <PopupComponent isOpen={isFullscreen} onClose={closeFullscreen}>
            <CarouselComponent
              images={images}
              activeImage={selectedImage}
              setActiveImage={setSelectedImage}
            />
          </PopupComponent>
        </div>
      )}
    </div>
  );
};
