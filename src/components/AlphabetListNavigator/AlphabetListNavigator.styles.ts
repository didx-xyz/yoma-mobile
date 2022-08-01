import { StyleSheet, ViewStyle } from 'react-native'

import { Colors, utils as StyleUtils, colors } from '~/styles'

const styles = {
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 80,
    right: 10,
    backgroundColor: StyleUtils.applyAlphaToHex(colors[Colors.White], 0.5),
    padding: 5,
    zIndex: 9999999,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
