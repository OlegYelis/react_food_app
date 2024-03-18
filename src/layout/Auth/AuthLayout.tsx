import { Outlet } from "react-router-dom";

import styles from "./AuthLayout.module.css";

export const AuthLayout = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.logo}>
        <img src="../images/auth_logo.webp" alt="Logo" width={"400px"} />
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};
