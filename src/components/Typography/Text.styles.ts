import { StyleSheet, TextStyle } from 'react-native'

import { colors } from '../../styles'
import { TextAlign } from './Text.types'
import { fontWeights } from './fontWeights.styles'

const styles = {
  base: {
    textAlign: TextAlign.left,
    color: colors.primaryPurple,
    ...fontWeights.medium_500,
  } as TextStyle,
}
export default StyleSheet.create(styles)
