import { UploadInputProps } from "./UploadInput.types";

import styles from "./UploadInput.module.css";

export const UploadInputComponent: React.FC<UploadInputProps> = ({
  type,
  handleChange,
}) => {
  return (
    <div className={styles.uploadInput}>
      <input
        type={type}
        accept="image/png, image/gif, image/jpeg"
        onChange={handleChange}
      />
    </div>
  );
};
