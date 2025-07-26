import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import React from 'react';
import { getCurrentWeather, getForecast } from '../api/api';

interface DayForecast {
  condition: object,
  temp_c: number,
  time: string
}
interface Forecast {
  day: DayForecast[],
  days: DayForecast[]
}
interface WeatherState {
  longitude: string,
  isLoading: boolean,
  temp: number,
  city: string,
  desc: string,
  icon: string,
  forecast: Forecast,
}

const initialState: WeatherState = {
  isLoading: false,
  longitude: '',
  temp: 0,
  city: '',
  desc: '',
  icon: '',
  forecast: {
    day: [],
    days: [],
  },
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
    .addCase(currentWeather.pending, state => {
      state.isLoading = true;
    })
    .addCase(currentWeather.fulfilled, (state, actions) => {
      const {payload: {current: {temp_c, condition: {text, icon}}, location: {name}} } = actions;
      state.temp = temp_c;
      state.city = name;
      state.desc = text;
      state.icon = icon;
      state.isLoading = false;
      console.log('RESULT 4', state, );
    })
    .addCase(getWeatherForecast.fulfilled, (state, action) => {
      // const {hour} = action.payload[0];
      // state.forecast.day = hour;
      console.log('RESULT 5', state, );
    });
  },
});

export const currentWeather = createAsyncThunk(
  'currentWeather',
  async (coords, thunkAPI) => {
    try {
      const {latitude, longitude} = coords;
      const response = await getCurrentWeather(latitude, longitude);
      return response.data;
    }
    catch (error){
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getWeatherForecast = createAsyncThunk(
  'getWeatherForecast',
  async (coords, thunkAPI) => {
    try {
      const {latitude, longitude} = coords;
      const response = await getForecast(latitude, longitude);
      return response.data.forecast.forecastday;
    }
    catch (error){
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export default weatherSlice.reducer;
