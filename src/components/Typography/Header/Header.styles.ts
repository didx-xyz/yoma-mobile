import { StyleSheet, TextStyle } from 'react-native'

import { Colors, colors } from '~/styles'

import { fontWeights } from '../fontWeights.styles'
import { HeaderLevels } from './Header.types'

const styles: Record<HeaderLevels, TextStyle> = {
  [HeaderLevels.H1]: {
    ...fontWeights.bold700,
    fontSize: 35,
    lineHeight: 40,
    letterSpacing: 0.02,
    color: colors[Colors.PrimaryPurple],
  } as TextStyle,
  [HeaderLevels.H2]: {
    ...fontWeights.semiBold600,
    fontSize: 25,
    lineHeight: 29,
    color: colors[Colors.PrimaryPurple],
  } as TextStyle,
  [HeaderLevels.H3]: {
    ...fontWeights.semiBold600,
    fontSize: 21,
    lineHeight: 23,
    color: colors[Colors.PrimaryPurple],
  } as TextStyle,
  [HeaderLevels.H4]: {
    ...fontWeights.semiBold600,
    fontSize: 18,
    lineHeight: 21,
    color: colors[Colors.PrimaryPurple],
  } as TextStyle,
  [HeaderLevels.H5]: {
    ...fontWeights.semiBold600,
    fontSize: 16,
    lineHeight: 17,
    color: colors[Colors.PrimaryDarkGrey],
  } as TextStyle,
  [HeaderLevels.H6]: {
    ...fontWeights.semiBold600,
    fontSize: 14,
    lineHeight: 18,
    color: colors[Colors.PrimaryPurple],
  } as TextStyle,
}

export default StyleSheet.create(styles)
