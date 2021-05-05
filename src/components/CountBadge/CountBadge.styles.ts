import { StyleSheet, ViewStyle } from 'react-native'
import { CIRCULAR_RADIUS_DIVISOR } from 'styles/styles.constants'

const styles = {
  container: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30 / CIRCULAR_RADIUS_DIVISOR,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
