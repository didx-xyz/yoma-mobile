import { StyleSheet, TextStyle } from 'react-native'

import { Colors, colors } from '../../../styles'
import { fontWeights } from '../fontWeights.styles'
import { MetaLevels } from './Meta.types'

const styles: Record<MetaLevels, TextStyle> = {
  [MetaLevels.Small]: {
    ...fontWeights.Medium500,
    fontSize: 10,
    lineHeight: 13,
    color: colors[Colors.MenuGrey],
  } as TextStyle,
  [MetaLevels.SmallBold]: {
    ...fontWeights.Bold700,
    fontSize: 10,
    lineHeight: 13,
    color: colors[Colors.MenuGrey],
  } as TextStyle,
}

export default StyleSheet.create(styles)
