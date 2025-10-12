import React from "react"
import { StyleSheet, View } from "react-native"
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