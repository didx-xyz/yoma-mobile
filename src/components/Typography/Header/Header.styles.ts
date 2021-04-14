import { StyleSheet, TextStyle } from 'react-native'

import { Colors, colors } from '../../../styles'
import { fontWeights } from '../fontWeights.styles'
import { HeaderLevels } from './Header.types'

const styles: Record<HeaderLevels, TextStyle> = {
  [HeaderLevels.h1]: {
    ...fontWeights.bold_700,
    fontSize: 35,
    lineHeight: 40,
    letterSpacing: 0.02,
    color: colors[Colors.primaryPurple],
  } as TextStyle,
  [HeaderLevels.h2]: {
    ...fontWeights.semiBold_600,
    fontSize: 25,
    lineHeight: 29,
    color: colors[Colors.primaryPurple],
  } as TextStyle,
  [HeaderLevels.h3]: {
    ...fontWeights.semiBold_600,
    fontSize: 21,
    lineHeight: 23,
    color: colors[Colors.primaryPurple],
  } as TextStyle,
  [HeaderLevels.h4]: {
    ...fontWeights.semiBold_600,
    fontSize: 18,
    lineHeight: 21,
    color: colors[Colors.primaryPurple],
  } as TextStyle,
  [HeaderLevels.h5]: {
    ...fontWeights.semiBold_600,
    fontSize: 16,
    lineHeight: 17,
    color: colors[Colors.primaryDarkGrey],
  } as TextStyle,
  [HeaderLevels.h6]: {
    ...fontWeights.semiBold_600,
    fontSize: 14,
    lineHeight: 18,
    color: colors[Colors.primaryPurple],
  } as TextStyle,
}

export default StyleSheet.create(styles)
