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
export interface DayForecast {
  temp: number;
  date: string;
  icon: string;
  text: string;
}

export interface Forecast {
  day: DayForecast[];
  days: DayForecast[];
}

export interface WeatherState {
  longitude: string;
  isLoading: boolean;
  temp: number;
  city: string;
  desc: string;
  icon: string;
  lang: string;
  code: number;
  forecast: Forecast;
  newCity: string;
}
