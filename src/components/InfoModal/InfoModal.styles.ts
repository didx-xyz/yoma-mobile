import { StyleSheet, ViewStyle } from 'react-native'
import { applyAlphaToHex } from 'styles/styles.utils'

import { colors, Colors } from '../../styles'

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: applyAlphaToHex(colors[Colors.black])(0.57),
  } as ViewStyle,
  inner: {
    margin: 10,
    backgroundColor: colors[Colors.white],
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  } as ViewStyle,
  button: {
    marginTop: 20,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
