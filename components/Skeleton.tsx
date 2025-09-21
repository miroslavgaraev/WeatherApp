import React from "react"
import { StyleSheet } from "react-native"
import { View } from "react-native-reanimated/lib/typescript/Animated"
import SkeletonPlaceholder from "react-native-skeleton-placeholder"
export const Skeleton = () => (
  <View style={styles.container}>
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item height={80}/>
    </SkeletonPlaceholder>
  </View>
)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20
  }
})