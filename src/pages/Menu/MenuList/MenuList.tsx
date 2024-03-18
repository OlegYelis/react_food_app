import { ProductCard } from "../../../components/ProductCard/ProductCard";
import { MenuListProps } from "./MenuList.props";

import styles from "./MenuList.module.css";

export const MenuList = ({ products }: MenuListProps) => {
  return (
    <div className={styles.wrapper}>
      {products.map((item) => {
        const randomValue = Math.random() * (5 - 2) + 2;
        const roundedValue = Math.round(randomValue * 10) / 10;

        return (
          <ProductCard
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.ingredients}
            image={item.images}
            price={item.price}
            rating={roundedValue}
          />
        );
      })}
    </div>
  );
};
