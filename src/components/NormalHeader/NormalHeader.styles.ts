import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { colors, Colors } from '../../styles'
import {
  HEADER_HEIGHT,
  ICON_ELEVATION,
  ICON_LEFT_SPACING,
  ICON_RADIUS,
  LEFT_SPACING,
  RIGHT_SPACING,
} from './NormalHeader.constants'

const styles = {
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: colors[Colors.white],
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  } as ViewStyle,
  saveText: {
    paddingRight: LEFT_SPACING,
  } as TextStyle,
  addView: {
    flexDirection: 'row',
    paddingRight: RIGHT_SPACING,
  } as ViewStyle,
  addIcon: {
    backgroundColor: colors[Colors.white],
    marginLeft: ICON_LEFT_SPACING,
    elevation: ICON_ELEVATION,
    borderRadius: ICON_RADIUS,
  },
}

export default StyleSheet.create(styles)
