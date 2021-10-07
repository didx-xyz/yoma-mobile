import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { Colors, colors } from '~/styles'

const styles = {
  container: {
    backgroundColor: colors[Colors.White],
    borderRadius: 12,
    elevation: 3,
    margin: 10,
    height: 215,
    overflow: 'hidden',
  } as ViewStyle,
  text: {
    marginTop: 50,
    marginHorizontal: 35,
  } as TextStyle,
  yellowCircle: {
    position: 'absolute',
    right: 0,
  } as ViewStyle,
  purpleCircle: {
    position: 'absolute',
    top: 136,
  } as ViewStyle,
  button: {
    marginTop: 20,
    marginHorizontal: 90,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
