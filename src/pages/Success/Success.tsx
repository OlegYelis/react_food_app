import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";

import styles from "./Success.module.css";

export const Success = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.success}>
      <img
        className={styles.success__img}
        src="../images/auth_logo.webp"
        alt="Success order"
      />
      <p className={styles.success__txt}>
        Your order has been successfully placed
      </p>
      <Button
        className={styles.success__btn}
        appearence="big"
        onClick={() => navigate("/")}
      >
        Place a new one
      </Button>
    </div>
  );
};
