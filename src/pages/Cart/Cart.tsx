import { useDispatch, useSelector } from "react-redux";
import { Headling } from "../../components/Headling/Headling";
import { AppDispatch, RootState } from "../../store/store";
import { CartItem } from "../../components/CartItem/CartItem";
import { useEffect, useState } from "react";
import { Product } from "../../interfaces/product.interface";
import { get, ref } from "firebase/database";
import { db } from "../../helpers/firebaseInit";
import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../store/cart.slice";

import styles from "./Cart.module.css";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const items = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const total = items
    .map((i) => {
      const product = cartProducts.find((prod) => prod.id === i.id);
      if (!product) return 0;
      return i.count * product.price;
    })
    .reduce((acc, price) => (acc += price), 0)
    .toFixed(2);

  const getBurgerById = async (id: number) => {
    const burgersRef = ref(db, "burgers");
    const snapshot = await get(burgersRef);

    const burgersArray: Product[] = snapshot.val();
    const data = burgersArray.find((burger) => burger.id === id);

    return data;
  };

  const loadAllItems = async () => {
    const responses = await Promise.all(items.map((i) => getBurgerById(i.id)));
    const validResponses = responses.filter(
      (res): res is Product => res !== undefined
    );
    setCartProducts(validResponses);
  };

  useEffect(() => {
    loadAllItems();
  }, [items]);

  const checkoutHandler = () => {
    // some kind of post query
    dispatch(cartActions.clean());
    navigate("/success");
  };

  return (
    <>
      <Headling className={styles.cart__headling}>Cart</Headling>
      {!items.length && (
        <Headling className={styles.cart__info}>Your cart is empty</Headling>
      )}

      {!!items.length && (
        <>
          <div className={styles.cart__order}>
            {items.map((i) => {
              const product = cartProducts.find((prod) => prod.id === i.id);
              if (!product) return;
              return (
                <CartItem
                  key={product.id}
                  count={i.count}
                  image={product.images}
                  {...product}
                />
              );
            })}
          </div>
          <div className={styles.cart__total}>
            <p className={styles.cart__txt}>
              Total <span>({items.length})</span>
            </p>
            <p className={styles.cart__price}>
              {total} <span>&#36;</span>
            </p>
          </div>
          <div className={styles.cart__checkout}>
            <Button appearence="big" onClick={checkoutHandler}>
              Checkout
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
