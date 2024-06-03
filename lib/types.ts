export interface Coordinates {
  type: string;
  coordinates: [number, number];
}

export interface FormData {
  name: string;
  numberOfPeople: number;
  anyone: boolean;
  male:boolean;
  female:boolean;
  splitMoney:number;
  split: boolean;
  startLocationCoords:Coordinates,
  endLocationCoords:Coordinates,
  startLocation: string;
  endLocation: string;
  date:string
}

export interface FormErrors {
  [key: string]: { message: string };
}

export interface place{
  display_name:string,
  lat:number,
  lon:number
}

export interface ValidationError {
  field: string;
  message: string;
}