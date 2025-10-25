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

const SnowWelcomeScreen = () => {
  const {height, width} = Dimensions.get('window');
  console.log(width, height);
  const welcomeText = useSharedValue<number>(0);
  const sunOpacity = useSharedValue<number>(0);

  const movingSun = useAnimatedStyle(() => ({
    opacity: sunOpacity.value,
    transform: [{scale: sunOpacity.value}],
  }));
  const movingText = useAnimatedStyle(() => ({
    opacity: welcomeText.value,
    transform: [{scale: welcomeText.value}],
  }));

  React.useEffect(() => {
    sunOpacity.value = withTiming(1, {
      duration: 2500,
      easing: Easing.inOut(Easing.quad),
    });
    welcomeText.value = withTiming(1, {
      duration: 2500,
      easing: Easing.inOut(Easing.quad),
    });
  }, []);
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('../../assets/snowbg.jpg')}
        style={styles.background}>
        <Animated.View style={[movingSun]}>
          <Image style={styles.sun} source={require('../../assets/snow.png')} />
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
    marginBottom: 20,
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
    textShadowColor: '#838582',
    textShadowOffset: {width: 3, height: 2},
    textShadowRadius: 10,
    backgroundColor: '#b2b5ae',
    padding: 10,
    borderRadius: 10,
  },
});

export default SnowWelcomeScreen;
