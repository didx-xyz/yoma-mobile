import { StyleSheet, TextStyle } from 'react-native'

import { Colors, colors } from '../../../styles'
import { fontWeights } from '../fontWeights.styles'
import { BodyLevels } from './Body.types'

const styles: Record<BodyLevels, TextStyle> = {
  [BodyLevels.regular]: {
    ...fontWeights.medium_500,
    fontSize: 14,
    lineHeight: 18,
    color: colors[Colors.PrimaryDarkGrey],
  } as TextStyle,
  [BodyLevels.small]: {
    ...fontWeights.medium_500,
    fontSize: 12,
    lineHeight: 15,
    color: colors[Colors.PrimaryDarkGrey],
  } as TextStyle,
}

export default StyleSheet.create(styles)
