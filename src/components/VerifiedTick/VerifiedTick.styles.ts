import { StyleSheet, ViewStyle } from 'react-native'

import { Colors, constants as StyleConstants, colors } from '~/styles'

const TICK_BADGE_SIZE = 13

const styles = {
  container: {
    width: TICK_BADGE_SIZE,
    height: TICK_BADGE_SIZE,
    borderRadius: TICK_BADGE_SIZE / StyleConstants.CIRCULAR_RADIUS_DIVISOR,
    backgroundColor: colors[Colors.PrimaryRed],
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
}

export default StyleSheet.create(styles)
