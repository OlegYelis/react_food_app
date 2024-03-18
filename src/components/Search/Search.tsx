import { forwardRef } from "react";
import { SearchProps } from "./Search.props";

import styles from "./Search.module.css";

export const Search = forwardRef<HTMLInputElement, SearchProps>(function Input(
  { className, isValid = true, ...props },
  ref
) {
  return (
    <div className={styles["input-wrapper"]}>
      <svg className={styles.seacrh__icon} width="20px" height="20px">
        <use href="/images/icons.svg#icon-search"></use>
      </svg>
      <input
        {...props}
        ref={ref}
        className={`${className} ${styles.input}  ${
          !isValid && styles.invalid
        }`}
      />
    </div>
  );
});
