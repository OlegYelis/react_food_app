import { Await, useLoaderData } from "react-router-dom";
import { Product } from "../../interfaces/product.interface";
import { Suspense } from "react";
import { ColorRing } from "react-loader-spinner";
import { Headling } from "../../components/Headling/Headling";
import { Button } from "../../components/Button/Button";
import { IngredientsList } from "../../components/IngredientsList/IngredientsList";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { cartActions } from "../../store/cart.slice";

import styles from "./Product.module.css";

function Product() {
  const data = useLoaderData() as { data: Product };
  const dispatch = useDispatch<AppDispatch>();

  const randomValue = Math.random() * (5 - 2) + 2;
  const roundedValue = Math.round(randomValue * 10) / 10;

  return (
    <Suspense
      fallback={
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      }
    >
      <Await resolve={data}>
        {({ data }: { data: Product }) => (
          <div className={styles.product}>
            <div className={styles.product__header}>
              <Headling>{data.name}</Headling>
              <Button
                className={styles.product__btn}
                onClick={() => dispatch(cartActions.add(data.id))}
              >
                <svg className={styles.btn__icon} width="23px" height="23px">
                  <use href="../images/icons.svg#icon-shopping-basket"></use>
                </svg>
                Add to Cart
              </Button>
            </div>
            <div className={styles.product__info}>
              <div className={styles.image__wrap}>
                <img
                  className={styles.product__img}
                  src={data.images[1].lg}
                  alt={data.name}
                  width="600px"
                />
                <p className={styles.product__rating}>
                  {roundedValue}&nbsp;
                  <svg
                    className={styles.rating__icon}
                    width="15px"
                    height="15px"
                  >
                    <use href="../images/icons.svg#icon-star"></use>
                  </svg>
                </p>
              </div>
              <div className={styles.product__descr}>
                <p className={styles.product__txt}>{data.desc}</p>
                <p className={styles.product__price}>
                  Price
                  <span className={styles.product__currency}>
                    {data.price}&#36;
                  </span>
                </p>
              </div>
            </div>
            <IngredientsList ingredients={data.ingredients} />
          </div>
        )}
      </Await>
    </Suspense>
  );
}

export default Product;
