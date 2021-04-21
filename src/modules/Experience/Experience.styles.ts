import { ImageStyle, StyleSheet, ViewStyle } from 'react-native'

import { Colors, colors } from '../../styles'
import {
  CARD_BORDER_RADIUS,
  EDIT_ICON_RADIUS,
  HORIZONTAL_SPACING,
  LOGO_HEIGHT,
  LOGO_RADIUS,
  LOGO_WIDTH,
  VERTICAL_SPACING,
} from './Experience.constants'

const styles = {
  container: {
    backgroundColor: colors[Colors.backgroundGrey],
  } as ViewStyle,
  whiteCard: {
    backgroundColor: colors[Colors.white],
    borderRadius: CARD_BORDER_RADIUS,
    elevation: 3,
    margin: VERTICAL_SPACING,
  } as ViewStyle,

  cardView: {
    backgroundColor: colors[Colors.white],
    borderRadius: CARD_BORDER_RADIUS,
    padding: HORIZONTAL_SPACING,
    elevation: 3,
    marginTop: VERTICAL_SPACING,
    marginHorizontal: HORIZONTAL_SPACING,
  } as ViewStyle,
  row: {
    flexDirection: 'row',
  } as ViewStyle,
  image: {
    height: LOGO_HEIGHT,
    width: LOGO_WIDTH,
    marginHorizontal: HORIZONTAL_SPACING,
  } as ImageStyle,
  avatar: {
    height: LOGO_HEIGHT,
    width: LOGO_WIDTH,
    borderRadius: LOGO_RADIUS,
    backgroundColor: colors[Colors.backgroundGrey],
    marginHorizontal: HORIZONTAL_SPACING,
  } as ViewStyle,
  editIcon: {
    backgroundColor: colors[Colors.white],
    elevation: 3,
    borderRadius: EDIT_ICON_RADIUS,
    position: 'absolute',
    right: HORIZONTAL_SPACING,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
