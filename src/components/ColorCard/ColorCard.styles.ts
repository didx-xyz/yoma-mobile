import { StyleSheet, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'

import { CARD_BORDER_RADIUS, ELEVATION, VERTICAL_SPACING } from './ColorCard.constants'

const styles = {
  container: {
    backgroundColor: colors[Colors.white],
    borderRadius: CARD_BORDER_RADIUS,
    elevation: ELEVATION,
    margin: VERTICAL_SPACING,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
