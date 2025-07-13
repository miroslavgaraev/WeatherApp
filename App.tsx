
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
import { currentWeather } from './redux/WeatherSlice';
import { GestureHandlerRootView } from 'react-native-gesture-handler';





function App(): React.JSX.Element {
  const {height} = Dimensions.get('window')
  const dispatch = useAppDispatch()
  
  
  
  useEffect(() => {
    const result = async () => {
      const coords = await checkPermission()
      dispatch(currentWeather(coords))
    }
    result()
  }, [])
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={{height}}>
        <MainScreen/>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  
});

export default App;
