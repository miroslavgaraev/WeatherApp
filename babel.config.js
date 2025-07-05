module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      // Required for expo-router
      'react-native-reanimated/plugin',
    ],
  };
};
