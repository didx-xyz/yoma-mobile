import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'
import { applyAlphaToHex } from 'styles/styles.utils'

import textInputStyles from '../Input/Input.styles'

const styles = {
  container: {
    flex: 1,
  } as ViewStyle,
  textInput: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: applyAlphaToHex(colors[Colors.menuGrey])(0.7),
  } as ViewStyle,
  dateInput: {
    alignItems: 'flex-start',
    borderWidth: 0,
  } as ViewStyle,
  dateText: {
    ...textInputStyles.textInput,
    borderBottomWidth: 0,
  } as TextStyle,
  placeholder: {
    ...textInputStyles.textInput,
    color: colors[Colors.menuGrey],
    borderBottomWidth: 0,
  } as TextStyle,
}

export default StyleSheet.create(styles)
