import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { fontWeights } from '~/components/Typography/fontWeights.styles'
import { Colors, colors } from '~/styles'
import { applyAlphaToHex } from '~/styles/styles.utils'

const baseTextStyle = {
  ...fontWeights.medium500,
  fontSize: 14,
  color: colors[Colors.FontBlue],
} as TextStyle

const styles = {
  container: {
    marginBottom: 16,
  } as ViewStyle,
  dropDown: {
    margin: 0,
    padding: 0,
    paddingHorizontal: 0,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 0,
    borderColor: applyAlphaToHex(colors[Colors.MenuGrey])(0.7),
  } as ViewStyle,
  dropDownContainer: {
    padding: 0,
    margin: 0,
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
