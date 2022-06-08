import { StyleSheet, ViewStyle } from 'react-native'

import { Colors, utils as StyleUtils, colors } from '~/styles'

const styles = {
  container: {
    backgroundColor: StyleUtils.applyAlphaToHex(colors[Colors.SecondaryPurple], 0.1),
    padding: 8,
    borderRadius: 8,
    margin: 10,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
