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
import Drop from '../../assets/drop.svg';
import SecondDrop from '../../assets/secondDrop.svg';
import ThirdDrop from '../../assets/thirtDrop.svg';
const RainyWelcomeScreen = () => {
  const {height, width} = Dimensions.get('window');
  const dropHeight = height / 2;
  const dropWidth = width / 2;
  const welcomeText = useSharedValue<number>(0);
  const rainDropMovingHeight = useSharedValue<number>(-dropHeight);
  const rainDropMovingWidth = useSharedValue<number>(dropWidth);
  const rainSecondDropMovingHeight = useSharedValue<number>(-dropHeight);
  const rainSecondDropMovingWidth = useSharedValue<number>(dropWidth);
  const rainThirdDropMovingHeight = useSharedValue<number>(-dropHeight);
  const rainThirdDropMovingWidth = useSharedValue<number>(dropWidth);
  const rainDrop = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: rainDropMovingHeight.value,
      },
      {
        translateX: rainDropMovingWidth.value,
      },
    ],
  }));
  const rainSecondDrop = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: rainSecondDropMovingHeight.value,
      },
      {
        translateX: rainSecondDropMovingWidth.value,
      },
    ],
  }));
  const rainThirdDrop = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: rainThirdDropMovingHeight.value,
      },
      {
        translateX: rainThirdDropMovingWidth.value,
      },
    ],
  }));
  React.useEffect(() => {
    rainDropMovingHeight.value = withRepeat(
      withTiming(dropHeight, {duration: 3000, easing: Easing.linear}),
      0,
    );
    rainDropMovingWidth.value = withRepeat(
      withTiming(-dropWidth, {duration: 2500, easing: Easing.linear}),
      0,
    );
    rainSecondDropMovingHeight.value = withRepeat(
      withTiming(dropHeight, {duration: 2500, easing: Easing.linear}),
      0,
    );
    rainSecondDropMovingWidth.value = withRepeat(
      withTiming(-dropWidth, {duration: 3000, easing: Easing.linear}),
      0,
    );
    rainThirdDropMovingHeight.value = withRepeat(
      withTiming(dropHeight, {duration: 3000, easing: Easing.linear}),
      0,
    );
    rainThirdDropMovingWidth.value = withRepeat(
      withTiming(-dropWidth, {duration: 3000, easing: Easing.linear}),
      0,
    );
    welcomeText.value = withTiming(1, {
      duration: 2500,
      easing: Easing.inOut(Easing.quad),
    });
  }, []);
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('../../assets/BG_rain.png')}
        style={styles.background}>
        <Animated.View style={[rainDrop]}>
          <Drop
            width={15}
            height={70}
            style={{position: 'absolute', top: 0, right: 0}}
          />
        </Animated.View>
        <Animated.View style={[rainSecondDrop]}>
          <SecondDrop
            width={15}
            height={65}
            style={{position: 'absolute', top: 60, right: 130}}
          />
        </Animated.View>
        <Animated.View style={[rainThirdDrop]}>
          <ThirdDrop
            width={15}
            height={80}
            style={{position: 'absolute', top: 60, right: 30}}
          />
        </Animated.View>
        <Animated.View style={[rainDrop]}>
          <Drop
            width={20}
            height={80}
            style={{position: 'absolute', top: 90, right: -60}}
          />
        </Animated.View>
        <Animated.View style={[rainSecondDrop]}>
          <SecondDrop
            width={10}
            height={80}
            style={{position: 'absolute', top: -40, right: -100}}
          />
        </Animated.View>
        <Animated.View style={[rainThirdDrop]}>
          <ThirdDrop
            width={10}
            height={80}
            style={{position: 'absolute', top: 0, right: 0}}
          />
        </Animated.View>
        <Animated.View style={[rainDrop]}>
          <Drop
            width={10}
            height={60}
            style={{position: 'absolute', top: 120, right: 120}}
          />
        </Animated.View>
        <Animated.View style={[rainSecondDrop]}>
          <SecondDrop
            width={20}
            height={70}
            style={{position: 'absolute', top: -120, right: 0}}
          />
        </Animated.View>
        <Animated.View style={[rainThirdDrop]}>
          <ThirdDrop
            width={10}
            height={80}
            style={{position: 'absolute', top: -40, right: 190}}
          />
        </Animated.View>
        <Animated.View style={[rainDrop]}>
          <Drop
            width={20}
            height={80}
            style={{position: 'absolute', top: -30, right: 180}}
          />
        </Animated.View>
        <Animated.View style={[rainSecondDrop]}>
          <SecondDrop
            width={10}
            height={80}
            sstyle={{position: 'absolute', top: 0, right: 110}}
          />
        </Animated.View>
        <Animated.View style={[rainThirdDrop]}>
          <ThirdDrop
            width={10}
            height={80}
            style={{position: 'absolute', top: -100, right: 120}}
          />
        </Animated.View>
        {/* <Drop width={10} height={80} style={styles.drop} /> */}
        {/* <Animated.View style={[rainDrop]}>
          <Image
            style={styles.sun}
            source={require('../../assets/rain1.png')}
          />
        </Animated.View> */}
        {/* <Animated.View style={[movingText]}>
          <Text style={[styles.welcomeText]}>Добро пожаловать</Text>
        </Animated.View> */}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  drop: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  secondDrop: {
    position: 'absolute',
    top: 150,
    right: 0,
  },
  thirdDrop: {
    position: 'absolute',
    top: 0,
    right: 100,
  },
  sun: {
    width: 150,
    height: 150,
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
    textShadowColor: '#0424c4',
    textShadowOffset: {width: 3, height: 2},
    textShadowRadius: 10,
    backgroundColor: '#2b7dff',
    padding: 10,
    borderRadius: 10,
  },
  raindrops: {
    width: 600,
    height: 1000,
    // position: 'absolute',
  },
});

export default RainyWelcomeScreen;
