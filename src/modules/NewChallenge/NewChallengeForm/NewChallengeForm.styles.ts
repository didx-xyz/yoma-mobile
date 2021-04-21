import { StyleSheet, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'

import { FORM_INNER_SPACING, HORIZONTAL_SPACING, VERTICAL_SPACING } from './NewChallengeForm.constants'

const styles = StyleSheet.create({
  formView: {
    flex: 1,
    padding: FORM_INNER_SPACING,
  } as ViewStyle,
  checkBoxView: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  formDropDown: {
    borderWidth: 0,
    borderBottomWidth: 1,
    paddingLeft: 0,
  } as ViewStyle,
  checkBox: {
    marginRight: HORIZONTAL_SPACING,
  } as ViewStyle,
  datePickersRowView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: VERTICAL_SPACING,
  } as ViewStyle,
  placeholderStyle: {
    color: colors[Colors.menuGrey],
    marginLeft: 0,
  } as ViewStyle,
  iconInfo: {
    position: 'absolute',
    top: 0,
    right: 0,
  } as ViewStyle,
})

export default styles
