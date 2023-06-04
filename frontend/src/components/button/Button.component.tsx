import { ButtonProps } from "./Button.types";

import styles from "./Button.module.css";

export const ButtonComponent: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button onClick={onClick} type={"button"} className={styles.button}>
      {text && <span>{text}</span>}
    </button>
  );
};
