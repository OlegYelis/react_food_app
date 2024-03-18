import { FC } from "react";
import { ButtonProps } from "./Button.props";

import styles from "./Button.module.css";

export const Button: FC<ButtonProps> = ({
  children,
  className,
  appearence = "small",
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${styles.accent} ${
        appearence === "small" ? styles.small : styles.big
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
