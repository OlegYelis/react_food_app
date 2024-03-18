import { forwardRef } from "react";
import { InputProps } from "./Input.props";

import styles from "./Input.module.css";

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, isValid = true, ...props },
  ref
) {
  return (
    <input
      {...props}
      ref={ref}
      className={`${className} ${styles.input}  ${!isValid && styles.invalid}`}
    />
  );
});
