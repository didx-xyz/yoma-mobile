import { StyleSheet, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'
import { applyAlphaToHex } from 'styles/styles.utils'

const CERTIFICATE_COUNT_SIZE = 30
const CIRCULAR_RADIUS_DIVISOR = 2
const CERTIFICATE_COUNT_BORDER_RADIUS = CERTIFICATE_COUNT_SIZE / CIRCULAR_RADIUS_DIVISOR

const styles = {
  container: {
    backgroundColor: colors[Colors.backgroundGrey],
  } as ViewStyle,
  outerCard: {
    padding: 10,
  } as ViewStyle,
  certificateCount: {
    height: CERTIFICATE_COUNT_SIZE,
    width: CERTIFICATE_COUNT_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: CERTIFICATE_COUNT_BORDER_RADIUS,
    marginRight: 10,
    backgroundColor: applyAlphaToHex(colors[Colors.primaryBlue])(0.15),
  } as ViewStyle,
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
