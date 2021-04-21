import { StyleSheet, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'
import { applyAlphaToHex } from 'styles/styles.utils'

import {
  CERTIFICATE_COUNT_HEIGHT,
  CERTIFICATE_COUNT_WIDTH,
  LEFT_SPACING,
  OVERALL_SPACING,
  VERTICAL_SPACING,
} from './Skills.constants'

const styles = {
  container: {
    backgroundColor: colors[Colors.backgroundGrey],
  } as ViewStyle,
  outerCard: {
    padding: 10,
  } as ViewStyle,
  certificateCountView: {
    height: CERTIFICATE_COUNT_HEIGHT,
    width: CERTIFICATE_COUNT_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    padding: OVERALL_SPACING,
    borderRadius: CERTIFICATE_COUNT_HEIGHT / 2,
    marginRight: LEFT_SPACING,
    backgroundColor: applyAlphaToHex(colors[Colors.primaryBlue])(0.15),
  } as ViewStyle,
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: VERTICAL_SPACING,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
