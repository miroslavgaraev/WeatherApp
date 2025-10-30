import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {words} from '../constants/constants';
import Skeleton from './Skeleton';
const Modal = () => {
  const modalRef = useRef(null);
  const [activeButton, setActiveButton] = useState(true);
  const [modalHeight, setModalHeight] = useState(100);
  const {
    lang,
    isLoading,
    forecast: {days, day},
  } = useSelector((state: RootState) => state.weather);

  const [currentList, setCurrentList] = useState(day);

  useEffect(() => {
    // Открываем модалку сразу при загрузке компонента
    modalRef.current?.open();
  }, []);
  useEffect(() => {
    if (!activeButton) {
      setCurrentList(days);
    } else {
      setCurrentList(day);
    }
  }, [activeButton, day, days]);

  const handleLayout = (event: any) => {
    const {height} = event.nativeEvent.layout;
    setModalHeight(height);
  };
  return (
    <View style={styles.container} onLayout={handleLayout}>
      <Modalize
        alwaysOpen={100}
        ref={modalRef}
        modalStyle={styles.modal}
        closeSnapPointStraightEnabled={false}
        modalHeight={modalHeight}
        handlePosition="inside"
        handleStyle={styles.dragHandle}
        overlayStyle={styles.overStyle}
        // scrollViewProps={{scrollEnabled: false}}
        closeOnOverlayTap={false}>
        <View style={styles.bottomCont}>
          <TouchableOpacity
            onPress={() => setActiveButton(true)}
            style={activeButton ? styles.btnActive : styles.btnDefault}>
            <Text
              style={
                activeButton ? styles.btnTextActive : styles.btnTextDefault
              }>
              {words[lang].hours}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveButton(false)}
            style={activeButton ? styles.btnDefault : styles.btnActive}>
            <Text
              style={
                activeButton ? styles.btnTextDefault : styles.btnTextActive
              }>
              {words[lang].days}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal: 20, height: '100%'}}>
          <FlatList
            data={currentList}
            nestedScrollEnabled={true}
            keyExtractor={(item, index) => index.toString()}
            // showsVerticalScrollIndicator={true} // Показать индикатор прокрутки
            renderItem={({item}) => {
              if (isLoading) {
                return <Skeleton />;
              } else {
                return (
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
                );
              }
            }}
          />
        </View>
      </Modalize>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dragHandle: {
    height: 5,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modal: {
    flex: 1,
    paddingTop: 20,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 0,
  },
  overStyle: {
    backgroundColor: 'transparent',
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
});
export default Modal;
