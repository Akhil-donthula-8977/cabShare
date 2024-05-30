export type Coordinates = [number, number];
export interface FormData {
  name: string;
  numberOfPeople: number;
  anyone: boolean;
  split: boolean;
  startLocation: Coordinates;
  endLocation: Coordinates;
  date:string
}

export interface FormErrors {
  [key: string]: { message: string };
}

