import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Images} from '../assets/images';
import {RootState} from '../redux/store';
import {conditions} from '../functions/conditions';
import {useSelector} from 'react-redux';
import ChooseCity from './ChooseCityComponent';
import ChooseLanguageComponent from './ChooseLanguageComponent';

import Skeleton from './Skeleton';
import Modal from './Modal';

const MainScreen = () => {
  const {temp, icon, desc, lang, code, isLoading, city} = useSelector(
    (state: RootState) => state.weather,
  );
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const background = conditions.find(item => item.code === code)?.bg;

  useEffect(() => {
    if (Platform.OS === 'android') {
      setStatusBarHeight(StatusBar.currentHeight || 0);
    }
  }, []);

  return (
    <View style={styles.mainContainer}>
      <ImageBackground source={Images[background]} style={styles.background}>
        <View style={[styles.mainWrapper, {paddingTop: statusBarHeight}]}>
          <View style={styles.cityBlock}>
            <ChooseCity />
            <ChooseLanguageComponent />
          </View>
          {isLoading ? (
            <Skeleton />
          ) : (
            <View style={styles.weatherBlock}>
              <View>
                <Image source={{uri: `https:${icon}`}} width={80} height={80} />
              </View>
              <View style={styles.conditions}>
                <Text style={styles.temp}>
                  {temp}C{'\u00B0'}
                </Text>
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={styles.text}>
                  {desc}
                </Text>
              </View>
            </View>
          )}
          <Modal />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  forecastList: {
    paddingHorizontal: 20,
  },
  forecastItem: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 16,
    paddingHorizontal: 16,
    gap: 10,
  },
  forecastDate: {
    fontSize: 18,
  },
  forecastText: {
    fontSize: 18,
  },
  forecastTemp: {
    fontSize: 18,
  },
  handle: {
    height: 8,
    width: 80,
    backgroundColor: 'white',
    borderRadius: 16,
    alignSelf: 'center',
    marginTop: 10,
  },
  bottomCont: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 24,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  btnActive: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 16,
  },
  btnDefault: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 16,
    borderColor: 'white',
    borderWidth: 1,
  },
  btnTextActive: {
    textAlign: 'center',
    fontSize: 18,
  },
  btnTextDefault: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },
  modalCont: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    height: '100%',
  },
  searchCont: {
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 24,
    width: '80%',
    padding: 20,
    height: 200,
  },
  textOnInput: {
    fontSize: 20,
    fontWeight: 500,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: 'rgba(225, 225, 225, 1)',
    borderRadius: 13,
    marginTop: 10,
  },
  buttonsCont: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 24,
  },
  btnSave: {
    flex: 1,
    backgroundColor: 'rgba(2, 36, 255, 1)',
    borderRadius: 16,
    justifyContent: 'center',
    marginVertical: 15,
  },
  btnEsc: {
    flex: 1,
    borderRadius: 16,
    justifyContent: 'center',
    borderColor: 'rgba(2, 36, 255, 1)',
    borderWidth: 1,
    marginVertical: 15,
  },
  btnTextEsc: {
    textAlign: 'center',
    fontSize: 18,
    color: 'rgba(2, 36, 255, 1)',
  },
  btnTextSave: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },
  mainContainer: {
    flex: 1,
  },
  mainWrapper: {
    padding: 20,
    flex: 1, // занимает весь доступный экран
    flexDirection: 'column',
  },
  cityBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between', // по желанию
    alignItems: 'center', // по желанию
    paddingBottom: 16,
  },
  weatherBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between', // по желанию
    alignItems: 'center', // по желанию
    backgroundColor: 'rgba(255,255,255, 0.2)',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingBottom: 15,
    overflow: 'hidden',
    marginBottom: 24,
  },
  temp: {
    fontSize: 48,
    fontWeight: '600',
    color: 'white',
    // fontFamily:'Roboto',
  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  background: {
    flex: 1, // занимает весь доступный экран
    flexDirection: 'row',
    resizeMode: 'contain', // или 'stretch', 'contain'
    // justifyContent: 'space-between', // по желанию
    // alignItems: 'baseline', // по желанию
    position: 'relative',
  },

  // modalCont: {
  //   position: 'absolute',
  //   zIndex: 10,
  //   top: 0,
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   backgroundColor: 'rgba(0,0,0,0.5)',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  settings: {
    width: 40,
    height: 40,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255, 0.2)',
    borderRadius: 24,
    padding: 24,
    overflow: 'hidden',
  },
  city: {
    paddingLeft: 8,
    color: 'white',
    fontSize: 18,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: '600',
    padding: 20,
  },
  conditions: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 24,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  bottomActive: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 16,
  },
  bottomDefault: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 16,
    borderColor: 'white',
    borderWidth: 1,
  },
  // btnTextActive: {
  //   textAlign: 'center',
  //   fontSize: 18,
  // },
  // btnTextDefault: {
  //   color: 'white',
  //   textAlign: 'center',
  //   fontSize: 18,
  // },
  // handle: {
  //   height: 8,
  //   width: 80,
  //   backgroundColor: 'white', // желаемый цвет полоски
  //   borderRadius: 3,
  //   alignSelf: 'center',
  //   marginVertical: 10,
  // },
});

export default MainScreen;
