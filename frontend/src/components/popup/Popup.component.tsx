import classNames from "classnames";

import { PortalComponent as Portal } from "../portal/Portal.component";

import { PopupProps } from "./Popup.types";

import styles from "./Popup.module.css";

export const PopupComponent: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <Portal>
      <div className={classNames(styles.popup, { [styles.active]: isOpen })}>
        <div className={styles.container}>
          <button
            className={styles.close}
            onClick={onClose}
            title="Close window"
          ></button>
          {children}
        </div>
      </div>
    </Portal>
  );
};
