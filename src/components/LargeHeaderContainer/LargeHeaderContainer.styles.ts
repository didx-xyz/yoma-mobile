import { Dimensions, StyleSheet, ViewStyle } from 'react-native'

const { height, width } = Dimensions.get("window")

const styles = {
  container: {
    height: height / 2.5
  } as ViewStyle,
  logoContainer: {
    alignSelf: 'center',
  } as ViewStyle,
}

export default StyleSheet.create(styles)
