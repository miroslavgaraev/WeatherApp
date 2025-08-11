import React, {useEffect, useState} from 'react';

import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native';

import MainScreen from './components/MainScreen';
import {useAppDispatch} from './functions/common';
import {checkPermission} from './functions/permission';
import {currentWeather, getWeatherForecast} from './redux/WeatherSlice';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const result = async () => {
      const coords = await checkPermission();
      dispatch(currentWeather(coords));
      dispatch(getWeatherForecast(coords));
    };
    result();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <MainScreen />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});

export default App;
