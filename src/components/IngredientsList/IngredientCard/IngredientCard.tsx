import { FC } from "react";
import { Ingredient } from "../../../interfaces/product.interface";

import styles from "./IngredientCard.module.css";

export const IngredientCard: FC<Ingredient> = ({ img, name }) => {
  return (
    <li className={styles.ingredient}>
      <img
        className={styles.ingredient__img}
        src={img}
        alt={name}
        width="150px"
      />
      <div className={styles.ingredient__wrap}>
        <p className={styles.ingredient__name}>{name}</p>
      </div>
    </li>
  );
};
