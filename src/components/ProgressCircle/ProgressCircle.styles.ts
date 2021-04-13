import { StyleSheet, ViewStyle } from 'react-native'

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  } as ViewStyle,
  innerCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    zIndex: 2,
  } as ViewStyle,
  leftWrap: {
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    zIndex: 1,
  } as ViewStyle,
  loader: {
    borderRadius: 1000,
    left: 0,
    position: 'absolute',
    top: 0,
  } as ViewStyle,
  rightWrap: {
    position: 'absolute',
  } as ViewStyle,
})

export default StyleSheet.create(styles)
