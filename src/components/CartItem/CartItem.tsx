import { FC } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { cartActions } from "../../store/cart.slice";
import { CartItemProps } from "./CartItem.props";
import { Link } from "react-router-dom";

import styles from "./CartItem.module.css";

export const CartItem: FC<CartItemProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();

  const decreaseCountHandler = () => {
    dispatch(cartActions.decrease(props.id));
  };

  const incrementCountHandler = () => {
    dispatch(cartActions.add(props.id));
  };

  const removeFromCartHandler = () => {
    dispatch(cartActions.remove(props.id));
  };

  return (
    <div className={styles.item}>
      <Link to={`/product/${props.id}`} className={styles.cart__link}>
        <img
          className={styles.cart__image}
          src={`${props.image[0].sm}`}
          alt="product image"
          width="82px"
        />
      </Link>

      <div className={styles.cart__description}>
        <p className={styles.cart__name}>{props.name}</p>
        <p className={styles.cart__price}>{props.price} &#36;</p>
      </div>

      <div className={styles.cart__right}>
        <div className={styles.cart__actions}>
          <button className={styles.cart__minus} onClick={decreaseCountHandler}>
            <svg
              className={styles.decreaseCount__icon}
              width="20px"
              height="20px"
            >
              <use href="/images/icons.svg#icon-minus"></use>
            </svg>
          </button>
          <p className={styles.cart__count}>{props.count}</p>
          <button className={styles.cart__plus} onClick={incrementCountHandler}>
            <svg
              className={styles.incrementCount__icon}
              width="20px"
              height="20px"
            >
              <use href="/images/icons.svg#icon-plus"></use>
            </svg>
          </button>
          <button
            className={styles.cart__remove}
            onClick={removeFromCartHandler}
          >
            <svg
              className={styles.removeFromCart__icon}
              width="24px"
              height="24px"
            >
              <use href="/images/icons.svg#icon-close"></use>
            </svg>
          </button>
        </div>
        <p className={styles.cart__total}>
          Total: {(props.price * props.count).toFixed(2)} &#36;
        </p>
      </div>
    </div>
  );
};
