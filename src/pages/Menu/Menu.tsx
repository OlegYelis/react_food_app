import { useQuery } from "react-query";
import { Headling } from "../../components/Headling/Headling";
import { Search } from "../../components/Search/Search";
import { Product } from "../../interfaces/product.interface";
import { ColorRing } from "react-loader-spinner";
import { MenuList } from "./MenuList/MenuList";
import { ref, get, child, DataSnapshot } from "firebase/database";
import { AxiosError } from "axios";
import { db } from "../../helpers/firebaseInit";
import { ChangeEvent, useState, useEffect } from "react";

import styles from "./Menu.module.css";

async function getBurgers(name?: string): Promise<Product[]> {
  const burgersRef = ref(db, "burgers");
  const burgersSnapshot: DataSnapshot = await get(child(burgersRef, "/"));
  const burgersList: Product[] = burgersSnapshot.val();
  if (name) {
    const filteredItems = burgersList.filter(
      (item) =>
        item.name.toLowerCase().includes(name.trim()) ||
        item.ingredients.some((item) =>
          item.name.toLowerCase().includes(name.trim())
        )
    );
    return filteredItems;
  }
  return burgersList;
}

const Menu = () => {
  const [filter, setFilter] = useState<string>();

  const { data, isLoading, isError, error, refetch } = useQuery<
    Product[],
    AxiosError
  >("burgers", async () => {
    return getBurgers(filter);
  });

  useEffect(() => {
    refetch();
  }, [filter, refetch]);

  const updateFilter = (evt: ChangeEvent<HTMLInputElement>) => {
    setFilter(evt.target.value);
  };

  return (
    <>
      <div className={styles.head}>
        <Headling>Menu</Headling>
        <Search placeholder="Seacrh ..." onChange={updateFilter} />
      </div>

      {isError && (
        <p style={{ color: "white" }}>
          {error.message}
          <span
            style={{ fontSize: "20px", fontWeight: "600", marginTop: "20px" }}
          >
            {error?.response?.statusText}
            {}
          </span>
        </p>
      )}
      {!isLoading && !!data?.length && <MenuList products={data} />}

      {isLoading && (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      )}

      {!isLoading && data?.length === 0 && (
        <Headling className={styles.menu__info}>
          No products were found for your request
        </Headling>
      )}
    </>
  );
};

export default Menu;
