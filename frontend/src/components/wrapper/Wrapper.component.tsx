import { WrapperProps } from "./Wrapper.types";

import styles from "./Wrapper.module.css";

export const WrapperComponent: React.FC<WrapperProps> = ({
  title,
  children,
}) => {
  return (
    <div className={styles.wrapper}>
      <fieldset className={styles.fieldset}>
        <legend>{title}</legend>

        {children && children}
      </fieldset>
    </div>
  );
};
