import { Image } from "../../interfaces/product.interface";

export interface CartItemProps {
  id: number;
  name: string;
  image: Image[];
  price: number;
  count: number;
}
