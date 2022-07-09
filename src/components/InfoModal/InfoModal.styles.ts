import { StyleSheet, ViewStyle } from 'react-native'

import { Colors, colors } from '~/styles'
import { applyAlphaToHex } from '~/styles/styles.utils'

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: applyAlphaToHex(colors[Colors.Black])(0.57),
  } as ViewStyle,
  innerContainer: {
    margin: 10,
    backgroundColor: colors[Colors.White],
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  } as ViewStyle,
  button: {
    marginTop: 20,
    marginHorizontal: 100,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
