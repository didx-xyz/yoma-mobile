import { fontWeights } from 'components/Typography/fontWeights.styles'
import { StyleSheet, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'
import { applyAlphaToHex } from 'styles/styles.utils'

const styles = {
  textInput: {
    ...fontWeights.medium_500,
    fontSize: 14,
    color: colors[Colors.fontBlue],
    borderBottomWidth: 1,
    borderColor: applyAlphaToHex(colors[Colors.menuGrey])(0.7),
    padding: 0,
    marginBottom: 3,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
