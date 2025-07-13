import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  Button,
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Images} from '../assets/images';
import MapPin from '../assets/locationIco.svg';
import SettingsIco from '../assets/settingsIco.svg';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {conditions} from '../functions/conditions';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

const MainScreen = () => {
  const {city, temp, icon, desc} = useSelector(
    (state: RootState) => state.weather,
  );
  const [modalVisible, setModalVisible] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null)
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])
  return (
    <View style={styles.mainContainer}>
      <ImageBackground source={Images.backgroundOne} style={styles.background}>
        <View style={styles.mainWrapper}>
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
              <View>
                <View>
                  <TextInput placeholder="Введите название города" />
                  <Button title="Искать"></Button>
                </View>
                <Button
                  title="Закрыть"
                  onPress={() => setModalVisible(false)}></Button>
              </View>
            </Modal>
            <View>
              <SettingsIco width={40} height={40} />
            </View>
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
            {/* <BottomSheet ref={bottomSheetRef} onChange={handleSheetChanges}>
              <BottomSheetView>
                <Text>Hello</Text>
              </BottomSheetView>
            </BottomSheet> */}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor:'blue',
    flexDirection: 'column'
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
