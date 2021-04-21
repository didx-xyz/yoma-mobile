import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'
import { applyAlphaToHex } from 'styles/styles.utils'

import {
  HEIGHT_OF_CONTAINER,
  HORIZONTAL_SPACING,
  ITEM_RADIUS,
  LEFT_SPACING,
  OVERALL_SPACING,
  TEXT_SPACING,
  TOP_SPACING,
} from './SkillsForm.constants'

const styles = StyleSheet.create({
  outerContainer: {
    height: HEIGHT_OF_CONTAINER,
  } as ViewStyle,
  innerContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
    padding: OVERALL_SPACING,
  } as ViewStyle,
  autocompleteContainer: {
    marginHorizontal: HORIZONTAL_SPACING,
  } as ViewStyle,
  itemText: {
    paddingVertical: TOP_SPACING,
    margin: TEXT_SPACING,
  } as TextStyle,
  tag: {
    backgroundColor: applyAlphaToHex(colors[Colors.secondaryBlue])(0.15),
    borderRadius: ITEM_RADIUS,
    padding: OVERALL_SPACING,
    margin: TEXT_SPACING,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as ViewStyle,
  crossIcon: {
    marginRight: LEFT_SPACING,
  } as ViewStyle,
  inputContainerStyle: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: colors[Colors.menuGrey],
  } as ViewStyle,
})

export default styles
