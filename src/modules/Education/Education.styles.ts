import { StyleSheet, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'

import { CARD_BORDER_RADIUS, VERTICAL_SPACING } from './Education.constants'

const styles = {
  container: {
    backgroundColor: colors[Colors.backgroundGrey],
  } as ViewStyle,
  whiteCard: {
    backgroundColor: colors[Colors.white],
    borderRadius: CARD_BORDER_RADIUS,
    elevation: 3,
    margin: VERTICAL_SPACING,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
