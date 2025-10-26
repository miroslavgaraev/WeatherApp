import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MapPin from '../assets/locationIco.svg';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {words} from '../constants/constants';
import {useAppDispatch} from '../functions/common';
import {
  currentWeather,
  getWeatherForecast,
  getWeatherForecastCity,
  getWeatherWithCity,
} from '../redux/Thunks';
import {Coordinates} from '../functions/interfaces';
import {checkPermission} from '../functions/permission';
import {useEffect} from 'react';
const ChooseCity = () => {
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [newCity, setNewCity] = useState('');
  const {city, lang} = useSelector((state: RootState) => state.weather);
  const [cityInput, setCityInput] = useState('');
  const handleGetWeatherByCity = () => {
    setNewCity(cityInput);
    dispatch(getWeatherWithCity({newCity: cityInput, lang}));
    dispatch(getWeatherForecastCity({newCity: cityInput, lang}));
    setModalVisible(false);
  };

  useEffect(() => {
    const result = async () => {
      if (newCity) {
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
  return (
    <View>
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
                setCityInput(e);
              }}
            />
            <View style={styles.buttonsCont}>
              <TouchableOpacity
                style={styles.btnEsc}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.btnTextEsc}>{words[lang].cancel}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnSave}
                onPress={handleGetWeatherByCity}>
                <Text style={styles.btnTextSave}>{words[lang].save}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  modalCont: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
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
});
export default ChooseCity;
