import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'

const styles = {
  container: {
    backgroundColor: colors[Colors.white],
    borderRadius: 12,
    elevation: 3,
    margin: 10,
    height: 215,
    overflow: 'hidden',
  } as ViewStyle,
  text: {
    marginTop: 50,
    marginHorizontal: 35,
    zIndex: 1,
  } as TextStyle,
  yellowCircle: {
    position: 'absolute',
    right: 0,
    zIndex: 0,
  } as ViewStyle,
  purpleCircle: {
    position: 'absolute',
    top: 136,
    zIndex: 0,
  } as ViewStyle,
  button: {
    marginTop: 20,
    marginHorizontal: 90,
    zIndex: 1,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
