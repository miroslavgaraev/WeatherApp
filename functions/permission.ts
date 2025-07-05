import { Alert, Platform } from "react-native"
import { check, openSettings, PERMISSIONS, request, RESULTS } from "react-native-permissions"
import { getCurrentWeather } from "../api/api"
import Geolocation from "@react-native-community/geolocation"

export const checkPermission = async () => {
    const permission = Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    const result = await check(permission)
    if (result === RESULTS.GRANTED) {
      getCurrentLocation()
      const {longitude, latitude} = await getCurrentLocation()
      return {longitude, latitude}
      // const {data: {current, location}} = await getCurrentWeather(latitude, longitude)
    }
    else{
      requestPermission(permission)
    }

  }

export  const getCurrentLocation = async () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (pos) => {
          resolve(pos.coords)
        },
        (error) => {
          console.error(error)
          reject(error)
        },
        {
          enableHighAccuracy: true, timeout: 15000, maximumAge: 10000
        }
      )
    })
  }

export const requestPermission = async (permission) => {
    const result = await request(permission)
    console.log(result)
    if (result === RESULTS.GRANTED) {
      getCurrentLocation()
    }
    else{
      Alert.alert('Разрешение заблокировано',
          'Чтобы продолжить, откройте настройки и включите разрешения для этого приложения.', [
            {text: 'Отмена', style: 'cancel'},
            {text: 'Настройки', onPress: () => openSettings()}
          ])
    }
  }