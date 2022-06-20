import { StyleSheet, ViewStyle } from 'react-native'

import { Colors, utils as StyleUtils, colors } from '~/styles'

const styles = {
  container: {
    backgroundColor: StyleUtils.applyAlphaToHex(colors[Colors.MenuGrey])(0.7),
    height: 1,
    width: '100%',
  } as ViewStyle,
}

export default StyleSheet.create(styles)
