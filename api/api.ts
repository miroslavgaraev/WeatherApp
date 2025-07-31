import axios from "axios"

const API_KEY = '57fcdbd9c194402888d191629252106'
export const getCurrentWeather = async (lat, lon) =>{
  return await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lon}&lang=ru
    `)
}
export const getForecast = async (lat, lon) => {
  return await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=7&aqi=no&$lang=ru`)
}
export const getCityWeather = async (city) =>{
  return await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&lang=ru
    `)}
export const getForecastCity = async (city) => {
  return await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no&$lang=ru`)
}