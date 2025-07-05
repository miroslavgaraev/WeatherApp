import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

interface WeatherState {
  longitude: string
}

const initialState: WeatherState = {
  longitude: ''
}

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: builder => {

  }
})

export default weatherSlice.reducer