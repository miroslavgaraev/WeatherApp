import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import {Images} from '../assets/images';
import MapPin from '../assets/locationIco.svg';
import SettingsIco from '../assets/settingsIco.svg';

const MainScreen = () => {
  const {city, temp_c, icon, text} = {
    city: 'Санкт-Петербург',
    temp_c: '24',
    icon: '//cdn.weatherapi.com/weather/64x64/day/122.png',
    text: 'Пасмурно',
  };
  return (
    <View style={styles.mainContainer}>
      <ImageBackground source={Images.backgroundOne} style={styles.background}>
      <View>
        <View>
          <View style={styles.location}>
            <MapPin width={24} height={24}/>
            <Text>{city}</Text>
          </View>
          <View><SettingsIco width={40} height={40}/></View>
        </View>
        <View>
          <View><Text style={styles.temp}>{temp_c} C{'\u00B0'}</Text></View>
          <View>
            <Image source={{uri: `https:${icon}`}} width={40} height={40}/>
          </View>
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
  flexDirection:'column',
  },
  cityBlock:{
  flexDirection: 'row',
  justifyContent: 'space-between', // по желанию
  alignItems: 'center', // по желанию
  paddingBottom: 16,
  // backgroundColor:'red',
  },
  weatherBlock:{
  flexDirection: 'row',
  justifyContent: 'space-between', // по желанию
  alignItems: 'center', // по желанию
  backgroundColor: 'rgba(255,255,255, 0.2)',
  borderRadius: 24,
  padding: 24,
  overflow: 'hidden',
  marginBottom: 24,
  },
  temp:{
  fontSize: 48,
  fontWeight:'600',
  color: 'white',
  // fontFamily:'Roboto',
  },
  text:{
  color: 'white',
  fontSize: 18,
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
  location:{
  flexDirection: 'row',
  alignItems:'center',
  backgroundColor: 'rgba(255,255,255, 0.2)',
  borderRadius: 24,
  padding: 24,
  overflow: 'hidden',
  },
  city:{
  paddingLeft: 8,
  color: 'white',
  fontSize: 18,
  },
  container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  // backgroundColor:'blue',
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
});

export default MainScreen;
