import { StyleSheet, TextStyle } from 'react-native'

import colors from './colors.styles'
import fontStyles from './font.styles'
import { Colors, FontFamily } from './styles.types'

const TextStyles = {
  h4: {
    fontSize: 14,
    fontFamily: fontStyles[FontFamily.Medium],
  } as TextStyle,
  textTertiary5: {
    color: colors[Colors.PrimaryDarkGrey],
  },
  textTertiary3: {
    color: colors[Colors.PrimaryGreen],
  },
}

export default StyleSheet.create(TextStyles)
