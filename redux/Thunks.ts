import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentWeather, getForecast, getForecastCity } from '../api/api';
import { City, Params } from '../functions/interfaces';

export const currentWeather = createAsyncThunk(
  'currentWeather',
  async (data: Params, thunkAPI) => {
    try {
      const {
        coords: {longitude, latitude},
        lang,
      } = data;
      const response = await getCurrentWeather(latitude, longitude, lang);
      return response.data;
    } catch (error) {
       return thunkAPI.rejectWithValue(error.message);

    }
  },
);

export const getWeatherForecast = createAsyncThunk(
  'getWeatherForecast',
  async (data: Params, thunkAPI) => {
    try {
      const {
        coords: {longitude, latitude},
        lang,
      } = data;
      const response = await getForecast(latitude, longitude, lang);
      return response.data.forecast.forecastday;
    } catch (error: unknown) {
      let message;
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === 'string') {
        message = error;
      } else {
        message = 'Unknown error';
      }

      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const getWeatherWithCity = createAsyncThunk(
  'getWeatherWithCity',
  async (data: City, thunkAPI) => {
    try {
      const {newCity, lang} = data;
      const response = await getCityWeather(newCity, lang);
      return response.data;
    } catch (error: unknown) {
      let message;
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === 'string') {
        message = error;
      } else {
        message = 'Unknown error';
      }
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const getWeatherForecastCity = createAsyncThunk(
  'getWeatherForecastCity',
  async (data: City, thunkAPI) => {
    try {
      const {newCity, lang} = data;
      const response = await getForecastCity(newCity, lang);
      return response.data.forecast.forecastday;
    } catch (error: unknown) {
      let message;
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === 'string') {
        message = error;
      } else {
        message = 'Unknown error';
      }
      return thunkAPI.rejectWithValue(message);
    }
  },
);

