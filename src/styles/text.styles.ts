import { StyleSheet, TextStyle } from 'react-native'

import colors from './colors.styles'
import fontStyles from './font.styles'
import { Colors, FontFamily } from './styles.types'

const TextStyles = StyleSheet.create({
  h4: {
    fontSize: 14,
    fontFamily: fontStyles[FontFamily.medium],
  } as TextStyle,
  buttonText: {
    fontSize: 15,
    fontFamily: fontStyles[FontFamily.bold],
  } as TextStyle,
  textWhite: {
    color: colors[Colors.white],
  } as TextStyle,
  textTertiary5: {
    color: colors[Colors.primaryDarkGrey],
  },
  textTertiary3: {
    color: colors[Colors.primaryGreen],
  },
})

export default TextStyles
