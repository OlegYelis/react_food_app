import { Ingredient } from "../../interfaces/product.interface";
import { IngredientCard } from "./IngredientCard/IngredientCard";

import styles from "./IngredientsList.module.css";

export const IngredientsList = ({
  ingredients,
}: {
  ingredients: Ingredient[];
}) => {
  return (
    <div className={styles.ingredients}>
      <p className={styles.ingredients__title}>Ingredients:</p>
      <ul className={styles.ingredients__list}>
        {ingredients.map((item) => (
          <IngredientCard
            key={item.id}
            id={item.id}
            img={item.img}
            name={item.name}
          ></IngredientCard>
        ))}
      </ul>
    </div>
  );
};
