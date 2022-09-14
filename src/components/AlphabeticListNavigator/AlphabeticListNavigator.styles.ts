import { StyleSheet, ViewStyle } from 'react-native'

import { Colors, utils as StyleUtils, colors } from '~/styles'

const styles = {
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: StyleUtils.applyAlphaToHex(colors[Colors.White], 0.5),
    width: 20,
    zIndex: 100,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
