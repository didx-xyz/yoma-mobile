import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'
import { applyAlphaToHex } from 'styles/styles.utils'

import { fontWeights } from '../Typography/fontWeights.styles'

const baseTextStyle = {
  ...fontWeights.medium500,
  fontSize: 14,
  color: colors[Colors.FontBlue],
} as TextStyle

const styles = {
  dropDown: {
    height: 30,
    paddingHorizontal: 0,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 0,
    borderColor: applyAlphaToHex(colors[Colors.MenuGrey])(0.7),
  } as ViewStyle,
  dropDownView: {
    height: 180,
    borderWidth: 0,
    elevation: 3,
    borderRadius: 0,
  } as ViewStyle,
  label: {
    ...baseTextStyle,
  } as TextStyle,
  searchContainer: {
    borderBottomColor: applyAlphaToHex(colors[Colors.MenuGrey])(0.7),
  } as ViewStyle,
  search: {
    ...baseTextStyle,
    borderWidth: 0,
  } as TextStyle,
  placeholder: {
    color: colors[Colors.MenuGrey],
  } as ViewStyle,
}

export default StyleSheet.create(styles)
