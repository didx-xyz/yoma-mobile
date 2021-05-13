import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'
import { applyAlphaToHex } from 'styles/styles.utils'

import { fontWeights } from '../Typography/fontWeights.styles'

const styles = {
  dropDown: {
    paddingHorizontal: 0,
    marginLeft: -2,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: applyAlphaToHex(colors[Colors.menuGrey])(0.7),
  } as ViewStyle,
  dropDownView: {
    height: 150,
    backgroundColor: colors[Colors.white],
    borderWidth: 0,
    elevation: 3,
    borderRadius: 0,
  } as ViewStyle,
  item: {
    justifyContent: 'flex-start',
  } as ViewStyle,
  title: {
    marginLeft: 10,
  } as TextStyle,
  label: {
    ...fontWeights.medium_500,
    fontSize: 14,
    color: colors[Colors.fontBlue],
  } as TextStyle,
  placeholder: {
    color: colors[Colors.menuGrey],
  } as ViewStyle,
}

export default StyleSheet.create(styles)
