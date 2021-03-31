import { Colors, FontFamily } from './styles.types';
import { StyleSheet, TextStyle } from 'react-native'
import fontStyles from './font.styles';
import colors from './colors.styles';

const TextStyles = StyleSheet.create({
  h1: {
    fontSize: 36,
    fontFamily: fontStyles[FontFamily.bold]
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
  buttonText: {
    fontSize: 15,
    fontFamily: fontStyles[FontFamily.bold],
  } as TextStyle,
  headerText: {
    fontSize: 16,
    fontFamily: fontStyles[FontFamily.semibold],
  } as TextStyle,
  textPrimary: {
    color: colors[Colors.primary]
  } as TextStyle,
  textWhite: {
    color: colors[Colors.white]
  } as TextStyle,
  textTertiary5: {
    color: colors[Colors.tertiary5]
  },
  textTertiary3: {
    color: colors[Colors.tertiary3]
  },
  cardHeaderText: {
    color: colors[Colors.primary],
    fontFamily: fontStyles[FontFamily.bold],
    fontSize: 21
  } as TextStyle,
  errorText: {
    color: colors[Colors.tertiary1],
    fontFamily: fontStyles[FontFamily.semibold],
    fontSize: 12,
    textAlign: 'center'
  } as TextStyle,
})

export default TextStyles;
