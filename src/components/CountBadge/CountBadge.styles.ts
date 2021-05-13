import { StyleSheet, ViewStyle } from 'react-native'
import { CIRCULAR_RADIUS_DIVISOR } from 'styles/styles.constants'

const BADGE_SIZE = 22

const styles = {
  container: {
    height: BADGE_SIZE,
    width: BADGE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BADGE_SIZE / CIRCULAR_RADIUS_DIVISOR,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
