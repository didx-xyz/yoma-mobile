import { StyleSheet, TextStyle } from 'react-native'

import { colors } from '../../styles'
import { TextAlign } from './Text.types'
import { fontWeights } from './fontWeights.styles'

const styles = {
  base: {
    textAlign: TextAlign.Left,
    color: colors.primaryPurple,
    ...fontWeights.medium500,
  } as TextStyle,
}
export default StyleSheet.create(styles)
