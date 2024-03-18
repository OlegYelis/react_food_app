import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../helpers/firebaseInit";
import { Notify } from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { userActions } from "../../store/user.slice";
import { useEffect } from "react";

import styles from "./Layout.module.css";

export const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => state.user.profile);
  const items = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userProfile = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          phoneNumber: user.phoneNumber,
        };
        dispatch(userActions.getProfile(userProfile));
      }
    });
  }, [dispatch]);

  const logOutHandler = async () => {
    signOut(auth)
      .then(() => {
        navigate("/auth/login");
        dispatch(userActions.removeJwt());
      })
      .catch((error) => {
        Notify.failure("Something went wrong");
        console.error(error.message);
      });
  };

  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <div className={styles.user}>
          <img
            className={styles.user__avatar}
            src="/images/user_avatar.webp"
            alt="user"
            width="90px"
          />

          <p className={styles.user__name}>
            {profile?.displayName || "User Name"}
          </p>
          <p className={styles.user__email}>{profile?.email}</p>
        </div>
        <div className={styles.menu}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${styles.link} ${isActive && styles.active}`
            }
          >
            <svg className={styles.link__icon} width="23px" height="23px">
              <use href="/images/icons.svg#icon-text-document"></use>
            </svg>
            Menu
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `${styles.link} ${isActive && styles.active}`
            }
          >
            <svg className={styles.link__icon} width="23px" height="23px">
              <use href="/images/icons.svg#icon-shopping-basket"></use>
            </svg>
            Cart
            <span className={styles["cart-count"]}>
              {items.reduce((acc, item) => (acc += item.count), 0)}
            </span>
          </NavLink>
        </div>

        <Button className={styles.exit} onClick={logOutHandler}>
          <svg className={styles.exit__icon} width="20px" height="20px">
            <use href="/images/icons.svg#icon-log-out"></use>
          </svg>
          Exit
        </Button>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};
