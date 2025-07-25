import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import React from 'react'
import { getCurrentWeather, getForecast } from '../api/api'

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
    days: []
  }
}

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
    .addCase(currentWeather.pending, state => {
      state.isLoading = true
    })
    .addCase(currentWeather.fulfilled, (state, actions) => {
      console.log(actions)
      const {payload: {current: {temp_c, condition: {text, icon}}, location: {name}} } = actions
      state.temp = temp_c
      state.city = name
      state.desc = text
      state.icon = icon
      state.isLoading = false
      
    })
    .addCase(getWeatherForecast.fulfilled, (state, actions) => {
      console.log('actions', actions)
      const day = actions.payload[0].hour.map(hour => {
        return {
          temp: hour.temp_c,
          date: hour.time,
          text: hour.condition.text,
          icon: hour.condition.icon
        }
      })
      const days = actions.payload.map(day => {
        return {
          date: day.date,
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
  async (coords, thunkAPI) => {
    console.log(coords)
    try {
      const {latitude, longitude} = coords
      const response = await getCurrentWeather(latitude, longitude)
      return response.data
    }
    catch (error){
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const getWeatherForecast = createAsyncThunk(
  'getWeatherForecast',
  async (coords, thunkAPI) => {
    console.log(coords)
    try {
      const {latitude, longitude} = coords
      const response = await getForecast(latitude, longitude)
      console.log(response, 'forecast')
      return response.data.forecast.forecastday
    }
    catch (error){
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export default weatherSlice.reducer