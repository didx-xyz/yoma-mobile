import { StyleSheet, TextStyle } from 'react-native'

import colors from './colors.styles'
import fontStyles from './font.styles'
import { Colors, FontFamily } from './styles.types'

const TextStyles = StyleSheet.create({
  h1: {
    fontSize: 36,
    fontFamily: fontStyles[FontFamily.bold],
  } as TextStyle,
  h2: {
    fontSize: 28,
  } as TextStyle,
  h3: {
    fontSize: 20,
  } as TextStyle,
  h4: {
    fontSize: 14,
    fontFamily: fontStyles[FontFamily.medium],
  } as TextStyle,
  h5: {
    fontSize: 12,
    fontFamily: fontStyles[FontFamily.small],
  } as TextStyle,
  boldText: {
    fontFamily: fontStyles[FontFamily.bold],
  } as TextStyle,
  semiBoldText: {
    fontFamily: fontStyles[FontFamily.semibold],
  } as TextStyle,
  buttonText: {
    fontSize: 15,
    fontFamily: fontStyles[FontFamily.bold],
  } as TextStyle,
  headerText: {
    fontSize: 16,
    fontFamily: fontStyles[FontFamily.semibold],
  } as TextStyle,
  textPrimary: {
    color: colors[Colors.primary],
  } as TextStyle,
  textSecondary: {
    color: colors[Colors.secondary],
  } as TextStyle,
  textWhite: {
    color: colors[Colors.white],
  } as TextStyle,
  textTertiary5: {
    color: colors[Colors.tertiary5],
  } as TextStyle,
  textTertiary7: {
    color: colors[Colors.tertiary7],
  } as TextStyle,
  textTertiary9: {
    color: colors[Colors.tertiary9],
  } as TextStyle,
  textTertiary3: {
    color: colors[Colors.tertiary3],
  } as TextStyle,
  cardHeaderText: {
    color: colors[Colors.primary],
    fontFamily: fontStyles[FontFamily.bold],
    fontSize: 21,
    paddingTop: 10,
    paddingBottom: 15,
    textAlign: 'center',
  } as TextStyle,
  errorText: {
    color: colors[Colors.tertiary1],
    fontFamily: fontStyles[FontFamily.semibold],
    fontSize: 12,
    textAlign: 'center',
  } as TextStyle,
})

export default TextStyles
