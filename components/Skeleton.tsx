import React from 'react';
import {StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Skeleton = () => (
  <View style={styles.container}>
    <SkeletonPlaceholder children={undefined}>
      <SkeletonPlaceholder.Item
        flexDirection="row"
        alignItems="center"
        height={80}
        borderRadius={16}
      />
    </SkeletonPlaceholder>
  </View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    boxSizing: 'border-box',
    marginVertical: 10,
  },
});
export default Skeleton;
