import { StyleSheet, ViewStyle } from 'react-native'

import { fontWeights } from '~/components/Typography/fontWeights.styles'
import { Colors, colors } from '~/styles'
import { applyAlphaToHex } from '~/styles/styles.utils'

const styles = {
  container: {
    marginBottom: 16,
  } as ViewStyle,
  textInput: {
    ...fontWeights.medium500,
    fontSize: 14,
    color: colors[Colors.FontBlue],
    borderBottomWidth: 1,
    borderColor: applyAlphaToHex(colors[Colors.MenuGrey])(0.7),
    padding: 0,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
