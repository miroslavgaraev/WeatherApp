 export interface Coordinates {
  longitude: number;
  latitude: number
}
export interface Params {
  coords: Coordinates,
  lang: string
}
export interface City {
  newCity: string,
  lang: string
}