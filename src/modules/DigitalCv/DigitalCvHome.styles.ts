import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { Colors, colors } from '../../styles'

const styles = {
  container: {
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject,
  } as ViewStyle,
  text: {
    fontSize: 36,
    fontWeight: 'bold',
  } as TextStyle,
}

export default StyleSheet.create(styles)
