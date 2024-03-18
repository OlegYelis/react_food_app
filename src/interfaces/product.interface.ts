export interface Product {
  id: number;
  name: string;
  images: Image[];
  desc: string;
  ingredients: Ingredient[];
  price: number;
  veg: boolean;
}

export interface Image {
  sm?: string;
  lg?: string;
}

export interface Ingredient {
  id: number;
  name: string;
  img: string;
}
