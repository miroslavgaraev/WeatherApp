import axios from "axios"
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";



const API_KEY = '57fcdbd9c194402888d191629252106'
export const getCurrentWeather = async (lat, lon, lang) =>{
  return await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lon}&lang=${lang}
    `)
}
export const getForecast = async (lat, lon, lang) => {
  return await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=7&aqi=no&lang=${lang}`)
}
export const getCityWeather = async (city, lang) =>{
  return await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&lang=${lang}
    `)}
export const getForecastCity = async (city, lang) => {
  return await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no&lang=${lang}`)
}