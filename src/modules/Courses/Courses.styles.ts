import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { Colors, colors } from '../../styles'

const styles = {
  container: {
    backgroundColor: colors[Colors.white],
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
  } as ViewStyle,
  text: {
    fontSize: 36,
    fontWeight: 'bold',
  } as TextStyle,
}

export default StyleSheet.create(styles)
