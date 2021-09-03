import { StyleSheet, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'
import { applyAlphaToHex } from 'styles/styles.utils'

const SPINNER_CONTAINER_SIZE = 70

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  spinnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: SPINNER_CONTAINER_SIZE,
    width: SPINNER_CONTAINER_SIZE,
    borderRadius: 16,
    backgroundColor: applyAlphaToHex(colors[Colors.White])(0.75),
  } as ViewStyle,
}

export default StyleSheet.create(styles)
