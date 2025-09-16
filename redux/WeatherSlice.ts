import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import React from 'react'
import { getCityWeather, getCurrentWeather, getForecast, getForecastCity } from '../api/api'
import { City, Coordinates, Params } from '../functions/interfaces'

interface DayForecast {
  temp: number,
  date: string,
  icon: string,
  text: string,
}

interface Forecast{
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
  lang: string,
  code: number,
  forecast: Forecast,
  newCity: string,
}

const initialState: WeatherState = {
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
    days: []
  }
}

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setLanguage: (state, action:PayloadAction<string>) => {
      state.lang = action.payload;
    },
    setNewCity: (state, action:PayloadAction<string>) => {
      state.newCity = action.payload
    }
  },
  extraReducers: builder => {
    builder
    .addCase(currentWeather.fulfilled, (state, actions) => {
      const {payload: {current: {temp_c, condition: {text, icon, code}}, location: {name}} } = actions
      state.temp = temp_c
      state.city = name
      state.desc = text
      state.icon = icon
      state.code = code
    })
    .addCase(getWeatherForecast.fulfilled, (state, actions) => {
      state.isLoading = false
      const day = actions.payload[0].hour.map((hour: any) => {
        return {
          temp: hour.temp_c,
          date: hour.time.split(' ')[1],
          text: hour.condition.text,
          icon: hour.condition.icon
        }
      })
      const days = actions.payload.map((day: any) => {
        return {
          date: day.date.split('-').slice(2, 3).concat(day.date.split('-').slice(1, 2)).join('.'),
          temp: day.day.avgtemp_c, 
          text: day.day.condition.text, 
          icon: day.day.condition.icon
        }
      })
      state.forecast.days = days
      state.forecast.day = day
      
    })
    .addCase(getWeatherWithCity.fulfilled, (state, actions) => {
      console.log(actions)
      const {payload: {current: {temp_c, condition: {text, icon}}, location: {name}} } = actions
      state.temp = temp_c
      state.city = name
      state.desc = text
      state.icon = icon
      state.isLoading = false
      
    })
    .addCase(getWeatherForecastCity.fulfilled, (state, actions) => {
      const day = actions.payload[0].hour.map((hour: any) => {
        return {
          temp: hour.temp_c,
          date: hour.time.split(' ')[1],
          text: hour.condition.text,
          icon: hour.condition.icon
        }
      })
      const days = actions.payload.map((day: any) => {
        return {
          date: day.date.split('-').slice(2, 3).concat(day.date.split('-').slice(1, 2)).join('.'),
          temp: day.day.avgtemp_c, 
          text: day.day.condition.text, 
          icon: day.day.condition.icon
        }
      })
      state.forecast.days = days
      state.forecast.day = day
      
    })
  }
})

export const currentWeather = createAsyncThunk(
  'currentWeather',
  async (data:Params, thunkAPI) => {

    try {
      const {coords: {longitude, latitude}, lang} = data
      
      const response = await getCurrentWeather(latitude, longitude, lang)
      return response.data
    }
    catch (error){
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const getWeatherForecast = createAsyncThunk(
  'getWeatherForecast',
  async (data:Params, thunkAPI) => {

    try {
      const {coords: {longitude, latitude}, lang} = data
      const response = await getForecast(latitude, longitude, lang)
      return response.data.forecast.forecastday
    }
    catch (error){
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)


export const getWeatherWithCity = createAsyncThunk(
  'getWeatherWithCity',
  async (data:City, thunkAPI) => {
    try {
      const {newCity, lang} = data
      const response = await getCityWeather(newCity, lang)
      console.log(response.data, 'newCity')
      return response.data
    }
    catch (error){
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const getWeatherForecastCity = createAsyncThunk(
  'getWeatherForecastCity',
  async (data:City, thunkAPI) => {

    try {
      const {newCity, lang} = data
  
      const response = await getForecastCity(newCity, lang)
      console.log(response.data.forecast.forecastday, 'newCityF')
      return response.data.forecast.forecastday
    }
    catch (error){
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)


export default weatherSlice.reducer

export const {setLanguage, setNewCity} = weatherSlice.actions
