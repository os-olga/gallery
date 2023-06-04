import { CardProps } from "./Card.types";

import styles from "./Card.module.css";

export const CardComponent: React.FC<CardProps> = ({
  id,
  description,
  imgSrc,
  removeImage,
  onClick,
}) => {
  return (
    <div className={styles.card}>
      <button
        title="Remove image card"
        className={styles.remove}
        onClick={() => {
          removeImage(id);
        }}
      >
        X
      </button>
      <div className={styles.cardImage} onClick={onClick}>
        <img src={imgSrc} alt={imgSrc} />
      </div>
      <div className={styles.text}>{description && <p>{description}</p>}</div>
    </div>
  );
};
