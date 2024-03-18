import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";

import styles from "./ErrorPage.module.css";

export const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.error}>
      <img
        className={styles.error__img}
        src="../images/auth_logo.webp"
        alt="logo"
        width="400px"
      />
      <p className={styles.error__txt}>Page not found</p>
      <Button appearence="big" onClick={() => navigate("/")}>
        Main page
      </Button>
    </div>
  );
};
