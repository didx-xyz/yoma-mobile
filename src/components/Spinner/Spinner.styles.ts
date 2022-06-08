import { StyleSheet, ViewStyle } from 'react-native'

import { Colors, utils as StyleUtils, colors } from '~/styles'

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
    backgroundColor: StyleUtils.applyAlphaToHex(colors[Colors.White])(0.75),
  } as ViewStyle,
}

export default StyleSheet.create(styles)
