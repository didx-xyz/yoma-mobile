import { StyleSheet, ViewStyle } from 'react-native'

import { Colors, colors } from '../../styles'
import { CIRCULAR_RADIUS_DIVISOR } from '../../styles/styles.constants'

const TICK_BADGE_SIZE = 13

const styles = {
  container: {
    width: TICK_BADGE_SIZE,
    height: TICK_BADGE_SIZE,
    borderRadius: TICK_BADGE_SIZE / CIRCULAR_RADIUS_DIVISOR,
    backgroundColor: colors[Colors.primaryRed],
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
}

export default StyleSheet.create(styles)
