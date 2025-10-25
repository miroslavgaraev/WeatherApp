import React, {useEffect, useState} from 'react';

import {StyleSheet} from 'react-native';

import MainScreen from './components/MainScreen';
import {useAppDispatch} from './functions/common';
import {checkPermission} from './functions/permission';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {RootState} from './redux/store';
import {conditions} from './functions/conditions';
import RainyWelcomeScreen from './components/WelcomeScreens/RainyWelcomeScreen';
import FoggyWelcomeScreen from './components/WelcomeScreens/FoggyWelcomeScreen';
import SnowRainyWelcomeScreen from './components/WelcomeScreens/SnowRainyWelcomeScreen';
import SnowWelcomeScreen from './components/WelcomeScreens/SnowWelcomeScreen';
import SunnyWelcomeScreen from './components/WelcomeScreens/SunnyWelcomeScreen';
import ThunderWelcomeScreen from './components/WelcomeScreens/ThunderWelcomeScreen';
import WelcomeScreen from './components/WelcomeScreens/WelcomeScreen';
import {Coordinates} from './functions/interfaces';
import {currentWeather, getWeatherForecast} from './redux/Thunks';

const componentsMap: Record<string, React.ComponentType<any>> = {
  RainyWS: RainyWelcomeScreen,
  FoggyWS: FoggyWelcomeScreen,
  SnowRainyWS: SnowRainyWelcomeScreen,
  SnowWS: SnowWelcomeScreen,
  SunnyWS: SunnyWelcomeScreen,
  ThunderWS: ThunderWelcomeScreen,
  WS: WelcomeScreen,
};

function App(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const {code, showLoadingScreen, lang} = useSelector(
    (state: RootState) => state.weather,
  );
  const animation = conditions.find(item => item.code == code)?.animation;
  const DynamicComponent = animation ? componentsMap[animation] : null;
  const [showDynamic, setShowDynamic] = useState(false);
  useEffect(() => {
    const result = async () => {
      const coords: Coordinates = await checkPermission();
      dispatch(currentWeather({coords, lang}));
      dispatch(getWeatherForecast({coords, lang}));
    };
    result();
  }, []);
  useEffect(() => {
    let timer: any;
    if (showLoadingScreen) {
      setShowDynamic(true);
    } else if (showDynamic) {
      timer = setTimeout(() => {
        setShowDynamic(false);
      }, 2500);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [showLoadingScreen, showDynamic]);
  return (
    <GestureHandlerRootView style={styles.container}>
      {showDynamic ? DynamicComponent && <DynamicComponent /> : <MainScreen />}
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;
