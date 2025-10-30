import { Alert, Platform } from 'react-native';
import { check, openSettings, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import { Coordinates } from './interfaces';

export const checkPermission = async ():Promise<any> => {
    const permission = Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    const result = await check(permission);
    if (result === RESULTS.GRANTED) {
      getCurrentLocation();
      const coords:Coordinates = await getCurrentLocation();
      return coords;
    }
    else{
      requestPermission(permission);
    }

  };

export  const getCurrentLocation = async ():Promise<any> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (pos) => {
          resolve(pos.coords);
        },
        (error) => {
          console.error(error);
          reject(error);
        },
        {
          enableHighAccuracy: true, timeout: 15000, maximumAge: 10000,
        }
      );
    });
  };

export const requestPermission = async (permission) => {
    const result = await request(permission);
    console.log(result);
    if (result === RESULTS.GRANTED) {
      getCurrentLocation();
    }
    else{
      Alert.alert('Разрешение заблокировано',
          'Чтобы продолжить, откройте настройки и включите разрешения для этого приложения.', [
            {text: 'Отмена', style: 'cancel'},
            {text: 'Настройки', onPress: () => openSettings()},
          ]);
    }
  };
