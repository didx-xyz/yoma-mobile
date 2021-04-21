import { StyleSheet, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'
import { applyAlphaToHex } from 'styles/styles.utils'

import {
  DROP_DOWN_CONTAINER_HEIGHT,
  LEFT_SPACING,
  TAG_BORDER_RADIUS,
  TAG_MARGIN,
  VERTICAL_SPACING,
} from './DropDownTags.constants'

const styles = {
  dropDownStyle: {
    borderWidth: 0,
    borderBottomWidth: 1,
  } as ViewStyle,
  tag: {
    backgroundColor: applyAlphaToHex(colors[Colors.secondaryBlue])(0.15),
    borderRadius: TAG_BORDER_RADIUS,
    padding: VERTICAL_SPACING,
    margin: TAG_MARGIN,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as ViewStyle,
  crossIcon: {
    marginRight: LEFT_SPACING,
  } as ViewStyle,
  dropDownContainerStyle: {
    height: DROP_DOWN_CONTAINER_HEIGHT,
  } as ViewStyle,
  itemStyle: {
    justifyContent: 'flex-start',
  } as ViewStyle,
}

export default StyleSheet.create(styles)
