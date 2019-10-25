export interface BeerData {
  id: number;
  name: string;
  description: string;
  ebc: number;
}

export interface RouteObject {
  name: string;
  path: string;
}

export interface ColorScheme {
  color: number[];
  value: number;
}
