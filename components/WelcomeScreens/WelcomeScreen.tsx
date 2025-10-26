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

const WelcomeScreen = () => {
  const {height, width} = Dimensions.get('window');
  console.log(width, height);
  const welcomeText = useSharedValue<number>(0);
  const sunRotation = useSharedValue<number>(0);
  const sunOpacity = useSharedValue<number>(0);
  const fCloud = useSharedValue<number>(400);
  const twCloud = useSharedValue<number>(200);
  const thCloud = useSharedValue<number>(375);

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
  const movingFCloud = useAnimatedStyle(() => ({
    transform: [{translateY: -fCloud.value}],
  }));
  const movingTwCloud = useAnimatedStyle(() => ({
    transform: [{translateX: -twCloud.value}],
  }));
  const movingThCloud = useAnimatedStyle(() => ({
    transform: [{translateX: thCloud.value}],
  }));

  React.useEffect(() => {
    sunOpacity.value = withTiming(1, {
      duration: 2500,
      easing: Easing.inOut(Easing.quad),
    });
    sunRotation.value = withRepeat(
      withTiming(1, {duration: 5000, easing: Easing.linear}),
      0,
    );
    welcomeText.value = withTiming(1, {
      duration: 2500,
      easing: Easing.inOut(Easing.quad),
    });
    fCloud.value = withTiming(0, {duration: 2000, easing: Easing.linear});
    twCloud.value = withTiming(0, {duration: 1000, easing: Easing.linear});
    thCloud.value = withDelay(
      800,
      withTiming(0, {duration: 1000, easing: Easing.linear}),
    );
  }, []);
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('../../assets/backgroundBlueSky.jpg')}
        style={styles.background}>
        <Animated.View style={[movingSun]}>
          <Image style={styles.sun} source={require('../../assets/sun.png')} />
        </Animated.View>
        <Animated.View style={[styles.cloudOneWrapper, movingFCloud]}>
          <Image
            style={[styles.cloud]}
            source={require('../../assets/cloudThree.png')}
          />
        </Animated.View>
        <Animated.View style={[styles.cloudTwoWrapper, movingTwCloud]}>
          <Image
            style={[styles.cloud]}
            source={require('../../assets/cloudOne.png')}
          />
        </Animated.View>
        <Animated.View style={[styles.cloudThreeWrapper, movingThCloud]}>
          <Image
            style={[styles.cloud]}
            source={require('../../assets/cloudOne.png')}
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
  },
  cloud: {
    width: 150,
    height: 150,
  },
  cloudOneWrapper: {
    position: 'absolute',
    top: 220,
    left: 120,
    zIndex: 1,
  },

  cloudTwoWrapper: {
    position: 'absolute',
    top: 340,
    left: 40,
    zIndex: 1,
  },

  cloudThreeWrapper: {
    position: 'absolute',
    top: 370,
    left: 215,
    zIndex: 1,
    transform: [{scaleX: -1}],
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
    textShadowColor: '#0424c4',
    textShadowOffset: {width: 3, height: 2},
    textShadowRadius: 10,
    backgroundColor: '#2b7dff',
    padding: 10,
    borderRadius: 10,
  },
});

export default WelcomeScreen;
