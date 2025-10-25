import React, {useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {words} from '../constants/constants';
import {useAppDispatch} from '../functions/common';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {setLanguage} from '../redux/WeatherSlice';

import SettingsIco from '../assets/settingsIco.svg';

const ChooseLanguageComponent = () => {
  const [modalLangVisible, setModalLangVisible] = useState(false);
  const dispatch = useAppDispatch();
  const {lang} = useSelector((state: RootState) => state.weather);
  const selectLanguage = (isVisible: boolean, lang: string) => {
    setModalLangVisible(isVisible);
    dispatch(setLanguage(lang));
  };
  return (
    <View>
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
                selectLanguage(false, 'ru');
              }}>
              <Text
                style={lang == 'ru' ? styles.btnTextSave : styles.btnTextEsc}>
                {words[lang].RU}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={lang == 'en' ? styles.btnSave : styles.btnEsc}
              onPress={() => {
                selectLanguage(false, 'en');
              }}>
              <Text
                style={lang == 'en' ? styles.btnTextSave : styles.btnTextEsc}>
                {words[lang].EN}
              </Text>
            </TouchableOpacity>
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
  modalCont: {
    position: 'absolute',
    zIndex: 10,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ChooseLanguageComponent;
