export interface RouteObject {
  name: string;
  path: string;
}

export interface ColorScheme {
  color: number[];
  value: number;
}

export interface UnitValue {
  value: number;
  unit: string;
}

export interface MethodData {
  mash_temp: Array<{
    temp: UnitValue;
    duration: number;
  }>;
  fermentation: {
    temp: UnitValue;
  };
  twist: string | null;
}

export interface IngredientData {
  name: string;
  amount: UnitValue;
  add?: string;
  attribute?: string;
}

export interface APIData {
  id: number;
  name: string;
  tagline: string;
  description: string;
  abv: number;
  ebc: number;
  ibu: number;
  target_fg: number;
  target_og: number;
  srm: number;
  ph: number;
  method: MethodData;
  ingredients: {
    malt: IngredientData[];
    hops: IngredientData[];
    yeast: string;
  };
  food_pairing: string[];
}

export interface ItemData {
  title: string;
  value: string | number | undefined;
  unit: string;
}

