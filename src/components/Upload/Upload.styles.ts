import { StyleSheet, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'

import { BUTTON_RADIUS, CONTAINER_RADIUS, HORIZONTAL_SPACING, VERTICAL_SPACING } from './Upload.constants'

const styles = {
  innerView: {
    flexDirection: 'row',
    backgroundColor: colors[Colors.grey4],
    borderRadius: CONTAINER_RADIUS,
    paddingHorizontal: HORIZONTAL_SPACING,
    paddingVertical: 6,
    justifyContent: 'space-between',
    marginVertical: VERTICAL_SPACING,
  } as ViewStyle,
  buttonView: {
    backgroundColor: colors[Colors.white],
    paddingHorizontal: HORIZONTAL_SPACING,
    borderRadius: BUTTON_RADIUS,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
