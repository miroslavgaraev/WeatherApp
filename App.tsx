
import React, { useEffect } from 'react';

import {
  Alert,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import MainScreen from './components/MainScreen';
import { useAppDispatch } from './functions/common';
import { checkPermission } from './functions/permission';
import { current } from '@reduxjs/toolkit';
import { currentWeather, getWeatherForecast } from './redux/WeatherSlice';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { conditions } from './functions/conditions';
import RainyWelcomeScreen from './components/WelcomeScreens/RainyWelcomeScreen';


const componentsMap: Record<string, React.ComponentType<any>> = {
  RainyWS: RainyWelcomeScreen,

}


function App(): React.JSX.Element {
  const dispatch = useAppDispatch()
  const {code, isLoading} = useSelector((state: RootState) => state.weather)
  const animation = conditions.find(item => item.code == code)?.animation
  const DynamicComponent = animation ? componentsMap[animation] : null
  useEffect(() => {
    const result = async () => {
      const coords = await checkPermission()
      dispatch(currentWeather(coords))
      dispatch(getWeatherForecast(coords))
    }
    result()
  }, [])
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      {isLoading ? DynamicComponent && <DynamicComponent/> : <MainScreen/>}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  
});

export default App;
