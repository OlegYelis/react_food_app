import { FC } from "react";
import { HeadlingProps } from "./Headling.props";

import styles from "./Headling.module.css";

export const Headling: FC<HeadlingProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h1 className={`${styles.headling} ${className}`} {...props}>
      {children}
    </h1>
  );
};
