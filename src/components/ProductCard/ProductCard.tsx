import { FC } from "react";
import { ProductCardProps } from "./ProductCard.props";
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { cartActions } from "../../store/cart.slice";

import styles from "./ProductCard.module.css";

export const ProductCard: FC<ProductCardProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();

  const ingredientsNames = props.description.map((item) => item.name);
  const description = ingredientsNames.join(", ");

  const addProductHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(cartActions.add(props.id));
  };

  return (
    <Link to={`/product/${props.id}`} className={styles.card}>
      <div
        className={styles.card__top}
        style={{ backgroundImage: `url('${props.image[1].lg}')` }}
      >
        <p className={styles.price}>
          {props.price}&nbsp;
          <span className={styles.currency}>&#36;</span>
        </p>
        <Button className={styles.addToCart} onClick={addProductHandler}>
          <svg className={styles.addToCart__icon} width="20px" height="20px">
            <use
              href={
                import.meta.env.BASE_URL + "/images/icons.svg#icon-add_to_cart"
              }
            ></use>
          </svg>
        </Button>
        <p className={styles.rating}>
          {props.rating}&nbsp;
          <svg className={styles.rating__icon} width="15px" height="15px">
            <use
              href={import.meta.env.BASE_URL + "/images/icons.svg#icon-star"}
            ></use>
          </svg>
        </p>
      </div>
      <div className={styles.card__bottom}>
        <p className={styles.title}>{props.name}</p>
        <p className={styles.description}>{description}</p>
      </div>
    </Link>
  );
};
