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
import { getWeatherForecastCity, getWeatherWithCity } from '../redux/WeatherSlice';
import { useAppDispatch } from '../functions/common';
import { ScrollView } from 'react-native-gesture-handler';

const CustomHandle = () => <View style={styles.handle} />;

const MainScreen = () => {
  const dispatch = useAppDispatch()
  const {
    city,
    temp,
    icon,
    desc,
    forecast: {days, day},
  } = useSelector((state: RootState) => state.weather);
  const [activeButton, setActiveButton] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLangVisible, setModalLangVisible] = useState(false);
  const [statusBarHeight, setStatusBarHeight] = useState(0)
  const [newCity, setNewCity] = useState('')
  const [heightsArray, setHeightsArray] = useState([0,0])
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [bottomSheetHeight, setBottomSheetHeight] = useState(0)
  const handleSheetChanges = useCallback((index: number, position: number) => {
    setHeightsArray(prev => {
      let newHeightsArray = [...prev]
      newHeightsArray[index] = position
      return newHeightsArray
    })
    console.log('handleSheetChanges', heightsArray);
    const oppositeIndex = heightsArray.length - 1 -index
    if (oppositeIndex < 0 || oppositeIndex >= heightsArray.length) {
      return undefined
    }
    setBottomSheetHeight(heightsArray[oppositeIndex])
  }, []);
  const snapPoints = useMemo(() => ['6%', '100%'], []);
  const getWeatherByCity = () => {
    dispatch(getWeatherWithCity(newCity))
    dispatch(getWeatherForecastCity(newCity))
    setModalVisible(false)
  }
  useEffect(() => {
    if (Platform.OS === 'android') {
      setStatusBarHeight(StatusBar.currentHeight || 0)
    }
  }, [])
  return (
    <View style={styles.mainContainer}>
      <ImageBackground source={Images.backgroundOne} style={styles.background}>
        <View style={[styles.mainWrapper, {paddingTop: statusBarHeight}]}>
          <View style={styles.cityBlock}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <View style={styles.location}>
                <MapPin width={24} height={24} />
                <Text style={styles.city}>{city}</Text>
              </View>
            </TouchableOpacity>
 
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}>
              <View style={styles.modalCont}>
                <View style={styles.searchCont}>
                  <Text style={styles.textOnInput}>
                    Введите название города:
                  </Text>
                  <TextInput style={styles.modalInput} onChangeText={(e) => {
                    setNewCity(e)
                  }}/>
                  <View style={styles.buttonsCont}>
                    <TouchableOpacity
                      style={styles.btnEsc}
                      onPress={() => setModalVisible(false)}>
                      <Text style={styles.btnTextEsc}>Отмена</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnSave} onPress={getWeatherByCity}>
                      <Text style={styles.btnTextSave}>Сохранить</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            <TouchableOpacity onPress={() => setModalLangVisible(true)}>    
              <View>
                <SettingsIco width={40} height={40} />
              </View>
            </TouchableOpacity> 
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalLangVisible}>
              <View style={styles.modalCont}>
                <View style={styles.searchCont}>
                  <TouchableOpacity
                      style={styles.btnSave}
                      onPress={() => setModalLangVisible(false)}>
                      <Text style={styles.btnTextSave}>Русский</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnEsc} onPress={() => setModalLangVisible(false)}>
                      <Text style={styles.btnTextEsc}>Английский</Text>
                    </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
          <View style={styles.weatherBlock}>
            <View>
              <Text style={styles.temp}>
                {temp}C{'\u00B0'}
              </Text>
            </View>
            <View style={styles.conditions}>
              <Image source={{uri: `https:${icon}`}} width={80} height={50} />
              <Text numberOfLines={2} ellipsizeMode="tail" style={styles.text}>
                Местами дождь
              </Text>
            </View>
          </View>
          <View style={styles.container}>
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
                      По часам
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
                      По дням
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{paddingHorizontal: 20}}>
                  <ScrollView style={{flex: 1}}>
                  {!activeButton
                    ? days.map((day, index) => (
                        <View style={styles.forecastItem} key={index}>
                          <Text style={styles.forecastDate}>{day.date}</Text>
                          <Text style={styles.forecastText} numberOfLines={2} ellipsizeMode='tail'>{day.text.length > 10? day.text.substring(0,10) + '...' : day.text}</Text>
                          <Text style={styles.forecastTemp}>{day.temp}C{'\u00B0'}</Text>
                          <Image
                            source={{uri: `https:${day.icon}`}}
                            width={40}
                            height={40}
                          />
                        </View>
                      ))
                    : day.map((day, index) => (
                        <View style={styles.forecastItem} key={(index)}>
                          <Text style={styles.forecastDate}>{day.date}</Text>
                          <Text style={styles.forecastText}>{day.text.length > 10? day.text.substring(0,10) + '...' : day.text}</Text>
                          <Text style={styles.forecastTemp}>{day.temp}C{'\u00B0'}</Text>
                          <Image
                            source={{uri: `https:${day.icon}`}}
                            width={40}
                            height={40}
                          />
                        </View>
                      ))}
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
  forecastDate : {
    fontSize: 18
  },
  forecastText : {
    fontSize: 18,
  },
  forecastTemp : {
    fontSize: 18
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
    // backgroundColor:'red',
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
    backgroundColor: 'green',
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: '600',
    padding: 20,
  },
  conditions: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 100,
  },
});

export default MainScreen;
