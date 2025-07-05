import React from 'react'

import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming } from 'react-native-reanimated';

const RainyWelcomeScreen = () => {
  const {height, width} = Dimensions.get('window')
  console.log(width, height)
  const welcomeText = useSharedValue<number>(0)
  const sunOpacity = useSharedValue<number>(0)

  const movingSun = useAnimatedStyle(() => ({
    opacity: sunOpacity.value,
    transform: [{scale: sunOpacity.value}]
  }))
  const movingText = useAnimatedStyle(() => ({
    opacity: welcomeText.value,
    transform: [{scale: welcomeText.value}]
  }))

  
  React.useEffect(() => {
    sunOpacity.value = withTiming(1, {duration:2500, easing:Easing.inOut(Easing.quad)})
    welcomeText.value = withTiming(1, {duration:2500, easing:Easing.inOut(Easing.quad)})
  }, [])
  return (
    <View style={styles.mainContainer}>
      <ImageBackground source={require('../../assets/rainybg.jpg')} style={styles.background}>
      <Image source={require('../../assets/raindrops.png')} style={styles.raindrops}></Image>
      <Animated.View style={[movingSun]}>
        <Image style={styles.sun} source={require('../../assets/rain1.png')}/>
      </Animated.View>
      <Animated.View style={[movingText]}>
        <Text style={[styles.welcomeText]}>Добро пожаловать</Text>
      </Animated.View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  sun: {
    width: 150,
    height: 150
  },
  cloud: {
    width: 150,
    height: 150
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "red",
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  welcomeText: {
    fontSize:30,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 2,
    textTransform: 'uppercase',
    textShadowColor: '#0424c4',
    textShadowOffset: {width: 3, height: 2},
    textShadowRadius: 10,
    backgroundColor: '#2b7dff',
    padding: 10,
    borderRadius: 10
  },
  raindrops: {
    width: 500,
    height: 1000,
    position: 'absolute'
  }
});

export default RainyWelcomeScreen
