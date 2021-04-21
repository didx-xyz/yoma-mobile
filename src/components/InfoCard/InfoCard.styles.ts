import { ImageStyle, StyleSheet, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'

import {
  AVATAR_RADIUS,
  ELEVATION,
  HORIZONTAL_SPACING,
  ICON_RADIUS,
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
  TOP_SPACING,
  VERTICAL_SPACING,
} from './InfoCard.constants'

const styles = {
  cardView: {
    padding: VERTICAL_SPACING,
    elevation: ELEVATION,
  } as ViewStyle,
  row: {
    flexDirection: 'row',
    marginVertical: TOP_SPACING,
  } as ViewStyle,
  image: {
    height: IMAGE_HEIGHT,
    width: IMAGE_WIDTH,
    marginHorizontal: HORIZONTAL_SPACING,
  } as ImageStyle,
  avatar: {
    height: IMAGE_HEIGHT,
    width: IMAGE_WIDTH,
    borderRadius: AVATAR_RADIUS,
    backgroundColor: colors[Colors.primaryGreen],
    marginHorizontal: HORIZONTAL_SPACING,
  } as ViewStyle,
  editIcon: {
    backgroundColor: colors[Colors.white],
    elevation: ELEVATION,
    borderRadius: ICON_RADIUS,
    position: 'absolute',
    right: HORIZONTAL_SPACING,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
