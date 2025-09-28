import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { currentWeather, getWeatherForecast, getWeatherForecastCity, getWeatherWithCity } from './Thunks';
import { WeatherState } from '../functions/interfaces';

const initialState:WeatherState = {
  isLoading: true,
  longitude: '',
  temp: 0,
  city: '',
  desc: '',
  icon: '',
  lang: 'ru',
  code: 0,
  newCity: '',
  forecast: {
    day: [],
    days: [],
  },
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.lang = action.payload;
    },
    setNewCity: (state, action: PayloadAction<string>) => {
      state.newCity = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(currentWeather.fulfilled, (state, actions) => {
        const {
          payload: {
            current: {
              temp_c,
              condition: {text, icon, code},
            },
            location: {name},
          },
        } = actions;
        state.temp = temp_c;
        state.city = name;
        state.desc = text;
        state.icon = icon;
        state.code = code;
      })
      .addCase(getWeatherForecast.fulfilled, (state, actions) => {
        state.isLoading = false;
        const day = actions.payload[0].hour.map((hour: any) => {
          return {
            temp: hour.temp_c,
            date: hour.time.split(' ')[1],
            text: hour.condition.text,
            icon: hour.condition.icon,
          };
        });
        const days = actions.payload.map((day: any) => {
          return {
            date: day.date
              .split('-')
              .slice(2, 3)
              .concat(day.date.split('-').slice(1, 2))
              .join('.'),
            temp: day.day.avgtemp_c,
            text: day.day.condition.text,
            icon: day.day.condition.icon,
          };
        });
        state.forecast.days = days;
        state.forecast.day = day;
      })
      .addCase(getWeatherWithCity.fulfilled, (state, actions) => {
        const {
          payload: {
            current: {
              temp_c,
              condition: {text, icon},
            },
            location: {name},
          },
        } = actions;
        state.temp = temp_c;
        state.city = name;
        state.desc = text;
        state.icon = icon;
        state.isLoading = false;
      })
      .addCase(getWeatherForecastCity.fulfilled, (state, actions) => {
        const day = actions.payload[0].hour.map((hour: any) => {
          return {
            temp: hour.temp_c,
            date: hour.time.split(' ')[1],
            text: hour.condition.text,
            icon: hour.condition.icon,
          };
        });
        const days = actions.payload.map((day: any) => {
          return {
            date: day.date
              .split('-')
              .slice(2, 3)
              .concat(day.date.split('-').slice(1, 2))
              .join('.'),
            temp: day.day.avgtemp_c,
            text: day.day.condition.text,
            icon: day.day.condition.icon,
          };
        });
        state.forecast.days = days;
        state.forecast.day = day;
      });
  },
});

export default weatherSlice.reducer;

export const {setLanguage, setNewCity} = weatherSlice.actions;
