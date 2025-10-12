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
// Объединяем конфиги (если нужно; Expo позволяет merge вручную)
const mergedConfig = {
  ...defaultConfig,
  transformer: {
    ...defaultConfig.transformer,
    ...customConfig.transformer,
  },
  resolver: {
    ...defaultConfig.resolver,
    ...customConfig.resolver,
  },
};
// Если используете reanimated, оберните конфиг
module.exports = wrapWithReanimatedMetroConfig(mergedConfig);