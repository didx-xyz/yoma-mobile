import { StyleSheet, ViewStyle } from 'react-native'

const styles = {
  container: {
    overflow: 'hidden',
  } as ViewStyle,
  backgroundImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
  } as ViewStyle,
  content: {
    marginLeft: 125,
    marginRight: 30,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
