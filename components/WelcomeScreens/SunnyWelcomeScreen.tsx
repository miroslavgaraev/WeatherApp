import React from 'react';

import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const SunnyWelcomeScreen = () => {
  const {height, width} = Dimensions.get('window');
  console.log(width, height);
  const welcomeText = useSharedValue<number>(0);
  const sunRotation = useSharedValue<number>(0);
  const sunOpacity = useSharedValue<number>(0);
  const blikRotation = useSharedValue<number>(0);

  const movingSun = useAnimatedStyle(() => ({
    opacity: sunOpacity.value,
    transform: [
      {rotate: `${sunRotation.value * 360}deg`},
      {scale: sunOpacity.value},
    ],
  }));
  const movingText = useAnimatedStyle(() => ({
    opacity: welcomeText.value,
    transform: [{scale: welcomeText.value}],
  }));
  const movingBlik = useAnimatedStyle(() => ({
    opacity: sunOpacity.value,
    transform: [
      {rotate: `${blikRotation.value * 360}deg`},
      {scale: sunOpacity.value},
    ],
  }));

  React.useEffect(() => {
    sunOpacity.value = withTiming(1, {
      duration: 2500,
      easing: Easing.inOut(Easing.quad),
    });
    sunRotation.value = withTiming(1, {duration: 2500, easing: Easing.linear});
    welcomeText.value = withTiming(1, {
      duration: 2500,
      easing: Easing.inOut(Easing.quad),
    });
    blikRotation.value = withRepeat(
      withTiming(1, {duration: 5000, easing: Easing.linear}),
      0,
    );
  }, []);
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('../../assets/sunnybg.jpg')}
        style={styles.background}>
        <Animated.View style={[movingSun]}>
          <Image style={styles.sun} source={require('../../assets/sun2.png')} />
        </Animated.View>
        <Animated.View style={[movingBlik]}>
          <Image
            style={styles.blik}
            source={require('../../assets/blik.png')}
          />
        </Animated.View>
        <Animated.View style={[movingText]}>
          <Text style={[styles.welcomeText]}>Добро пожаловать</Text>
        </Animated.View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  sun: {
    width: 150,
    height: 150,
    zIndex: 1,
  },
  blik: {
    position: 'absolute',
    right: -295,
    bottom: -230,
    width: 600,
    height: 600,
    zIndex: 10,
    opacity: 0.5,
  },
  cloud: {
    width: 150,
    height: 150,
  },

  mainContainer: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  welcomeText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 2,
    textTransform: 'uppercase',
    textShadowColor: '#c9c302',
    textShadowOffset: {width: 3, height: 2},
    textShadowRadius: 10,
    backgroundColor: 'rgb(247, 239, 7)',
    padding: 10,
    borderRadius: 10,
  },
});

export default SunnyWelcomeScreen;
