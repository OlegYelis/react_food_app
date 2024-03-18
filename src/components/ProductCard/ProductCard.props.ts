import { Image, Ingredient } from "../../interfaces/product.interface";

export interface ProductCardProps {
  id: number;
  name: string;
  description: Ingredient[];
  image: Image[];
  price: number;
  rating: number;
}
