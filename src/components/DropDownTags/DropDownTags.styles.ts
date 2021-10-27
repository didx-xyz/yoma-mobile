import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { Colors, utils as StyleUtils, colors } from '~/styles'

import { fontWeights } from '../Typography/fontWeights.styles'

const baseTextStyle = {
  ...fontWeights.medium500,
  fontSize: 14,
  color: colors[Colors.FontBlue],
} as TextStyle

const styles = {
  container: {
    marginVertical: 20,
  } as ViewStyle,
  dropDown: {
    height: 30,
    paddingHorizontal: 0,
    borderWidth: 0,
    borderRadius: 0,
    borderColor: StyleUtils.applyAlphaToHex(colors[Colors.MenuGrey])(0.7),
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
    borderBottomColor: StyleUtils.applyAlphaToHex(colors[Colors.MenuGrey])(0.7),
  } as ViewStyle,
  search: {
    ...baseTextStyle,
    borderWidth: 0,
  } as TextStyle,
  placeholder: {
    color: colors[Colors.MenuGrey],
  } as ViewStyle,
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  } as ViewStyle,
  divider: {
    height: 1,
    backgroundColor: StyleUtils.applyAlphaToHex(colors[Colors.MenuGrey])(0.7),
    marginTop: 10,
  } as ViewStyle,
  save: {
    paddingRight: 10,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
