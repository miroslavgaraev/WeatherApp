const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');
// Основной конфиг по умолчанию
const defaultConfig = getDefaultConfig(__dirname);
// Ваши дополнительные параметры
const customConfig = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: (defaultConfig.resolver.assetExts || []).filter(
      ext => ext !== 'svg',
    ),
    sourceExts: [...(defaultConfig.resolver.sourceExts || []), 'svg'],
  },
};
// Объединяем конфиги
const mergedConfig = mergeConfig(defaultConfig, customConfig);
// Если используете reanimated, оберните конфиг
module.exports = wrapWithReanimatedMetroConfig(mergedConfig);