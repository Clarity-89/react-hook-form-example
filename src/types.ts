export type Recipe = {
  name: string;
  picture: string;
  description: string;
  amount: number;
  ingredients: Ingredient[];
};

export type Ingredient = {
  name: string;
  amount: string;
};
