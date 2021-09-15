import { StyleSheet, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'

import * as StyleUtils from '../../../styles/styles.utils'

const styles = {
  container: {
    backgroundColor: colors[Colors.White],
    borderRadius: 12,
    marginTop: 10,
    marginHorizontal: 10,
    padding: 10,
    ...StyleUtils.dropShadow(5, 5, 23, StyleUtils.applyAlphaToHex(Colors.DarkGrey02, 0.15), 5),
  } as ViewStyle,
  content: {
    borderTopWidth: 1,
    borderTopColor: colors[Colors.LightGrey],
  } as ViewStyle,
}

export default StyleSheet.create(styles)