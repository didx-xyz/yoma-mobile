import { StyleSheet, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'
import { applyAlphaToHex } from 'styles/styles.utils'

const styles = {
  textInput: {
    borderBottomWidth: 1,
    borderColor: applyAlphaToHex(colors[Colors.menuGrey])(0.7),
    color: colors[Colors.fontBlue],
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    fontWeight: '500',
    padding: 0,
    marginBottom: 3,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
