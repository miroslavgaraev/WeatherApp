import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Button,
  Image,
  ImageBackground,
  Modal,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Images} from '../assets/images';
import MapPin from '../assets/locationIco.svg';
import SettingsIco from '../assets/settingsIco.svg';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {conditions} from '../functions/conditions';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {
  currentWeather,
  getWeatherForecast,
  getWeatherForecastCity,
  getWeatherWithCity,
  setLanguage,
  setNewCity,
} from '../redux/WeatherSlice';
import {useAppDispatch} from '../functions/common';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {words} from '../constants/constants';
import {Coordinates} from '../functions/interfaces';
import {checkPermission} from '../functions/permission';
import {Skeleton} from './Skeleton';

const CustomHandle = () => <View style={styles.handle} />;

const MainScreen = () => {
  const dispatch = useAppDispatch();
  const {
    city,
    temp,
    icon,
    desc,
    lang,
    code,
    forecast: {days, day},
  } = useSelector((state: RootState) => state.weather);
  const background = conditions.find(item => item.code == code)?.bg;
  const [currentList, setCurrentList] = useState(day)
  const [activeButton, setActiveButton] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newCity, setNewCity] = useState('');
  const [modalLangVisible, setModalLangVisible] = useState(false);
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [bottomSheetHeight, setBottomSheetHeight] = useState(0);
  const [height, setHeight] = useState(0);
  const handleSheetChanges = useCallback((index: number, position: number) => {
    if (height) {
      if (index === 1) {
        setBottomSheetHeight(height / 2 - 100);
      } else {
        setBottomSheetHeight(height - 100);
      }
    }
  }, []);

  const handleLayout = (event: any) => {
    const {height} = event.nativeEvent.layout;
    setHeight(height);
  };
  const snapPoints = useMemo(() => ['6%', '50%', '100%'], []);
  const getWeatherByCity = () => {
    // dispatch(setNewCity(newCity))
    dispatch(getWeatherWithCity({newCity, lang}));
    dispatch(getWeatherForecastCity({newCity, lang}));
    setModalVisible(false);
  };
  useEffect(() => {
    if (Platform.OS === 'android') {
      setStatusBarHeight(StatusBar.currentHeight || 0);
    }
  }, []);

  useEffect(() => {
    const result = async () => {
      if (newCity) {
        console.log(newCity);
        dispatch(getWeatherWithCity({newCity, lang}));
        dispatch(getWeatherForecastCity({newCity, lang}));
      } else {
        const coords: Coordinates = await checkPermission();
        dispatch(currentWeather({coords, lang}));
        dispatch(getWeatherForecast({coords, lang}));
      }
    };
    result();
  }, [lang]);

  useEffect(() => {
    if(activeButton){
      setCurrentList(day)
    }else{
      setCurrentList(days)
    }
  }, [activeButton, day, days])

  return (
    <View style={styles.mainContainer}>
      <ImageBackground source={Images[background]} style={styles.background}>
        <View style={[styles.mainWrapper, {paddingTop: statusBarHeight}]}>
          <View style={styles.cityBlock}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <View style={styles.location}>
                <MapPin width={24} height={24} />
                <Text style={styles.city}>{newCity ? newCity : city}</Text>
              </View>
            </TouchableOpacity>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              statusBarTranslucent={true}>
              <View style={styles.modalCont}>
                <View style={styles.searchCont}>
                  <Text style={styles.textOnInput}>{words[lang].cityName}</Text>
                  <TextInput
                    style={styles.modalInput}
                    onChangeText={e => {
                      setNewCity(e);
                    }}
                  />
                  <View style={styles.buttonsCont}>
                    <TouchableOpacity
                      style={styles.btnEsc}
                      onPress={() => setModalVisible(false)}>
                      <Text style={styles.btnTextEsc}>
                        {words[lang].cancel}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.btnSave}
                      onPress={() => {
                        getWeatherByCity();
                      }}>
                      <Text style={styles.btnTextSave}>{words[lang].save}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            <Skeleton />
            <TouchableOpacity onPress={() => setModalLangVisible(true)}>
              <View>
                <SettingsIco width={40} height={40} />
              </View>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalLangVisible}
              statusBarTranslucent={true}>
              <View style={styles.modalCont}>
                <View style={styles.searchCont}>
                  <TouchableOpacity
                    style={lang == 'ru' ? styles.btnSave : styles.btnEsc}
                    onPress={() => {
                      setModalLangVisible(false);
                      dispatch(setLanguage('ru'));
                    }}>
                    <Text
                      style={
                        lang == 'ru' ? styles.btnTextSave : styles.btnTextEsc
                      }>
                      {words[lang].RU}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={lang == 'en' ? styles.btnSave : styles.btnEsc}
                    onPress={() => {
                      setModalLangVisible(false);
                      dispatch(setLanguage('en'));
                    }}>
                    <Text
                      style={
                        lang == 'en' ? styles.btnTextSave : styles.btnTextEsc
                      }>
                      {words[lang].EN}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
          <View style={styles.weatherBlock}>
            <View>
              <Image
                style={styles.imageWeather}
                source={{uri: `https:${icon}`}}
                width={80}
                height={80}
              />
            </View>
            <View style={styles.conditions}>
              <Text style={styles.temp}>
                {temp}C{'\u00B0'}
              </Text>
              <Text numberOfLines={2} ellipsizeMode="tail" style={styles.text}>
                {desc}
              </Text>
            </View>
          </View>
          <View style={styles.container} onLayout={handleLayout}>
            <BottomSheet
              handleComponent={CustomHandle}
              backgroundStyle={{
                backgroundColor: 'rgba(255,255,255,0.5)',
                borderTopLeftRadius: 32,
                borderTopRightRadius: 32,
              }}
              ref={bottomSheetRef}
              onChange={handleSheetChanges}
              snapPoints={snapPoints}>
              <BottomSheetView>
                <View style={styles.bottomCont}>
                  <TouchableOpacity
                    onPress={() => setActiveButton(true)}
                    style={activeButton ? styles.btnActive : styles.btnDefault}>
                    <Text
                      style={
                        activeButton
                          ? styles.btnTextActive
                          : styles.btnTextDefault
                      }>
                      {words[lang].hours}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setActiveButton(false)}
                    style={activeButton ? styles.btnDefault : styles.btnActive}>
                    <Text
                      style={
                        activeButton
                          ? styles.btnTextDefault
                          : styles.btnTextActive
                      }>
                      {words[lang].days}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{paddingHorizontal: 20, height: bottomSheetHeight}}>
                  <ScrollView style={{flex: 1}}>
                    <FlatList
                      data={currentList}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({item}) => (
                        <View style={styles.forecastItem}>
                          <Text style={styles.forecastDate}>{item.date}</Text>
                          <Text
                            style={styles.forecastText}
                            numberOfLines={2}
                            ellipsizeMode="tail">
                            {item.text.length > 10
                              ? item.text.substring(0, 10) + '...'
                              : item.text}
                          </Text>
                          <Text style={styles.forecastTemp}>
                            {item.temp}C{'\u00B0'}
                          </Text>
                          <Image
                            source={{uri: `https:${item.icon}`}}
                            width={40}
                            height={40}
                          />
                        </View>
                      )}
                    />
                    
                  </ScrollView>
                </View>
              </BottomSheetView>
            </BottomSheet>
          </View>
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
    boxSizing: 'border-box',
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
  imageWeather: {
    marginTop: 15,
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
    resizeMode: 'cover', // или 'stretch', 'contain'
    // justifyContent: 'space-between', // по желанию
    alignItems: 'baseline', // по желанию
    position: 'relative',
  },
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
});

export default MainScreen;
