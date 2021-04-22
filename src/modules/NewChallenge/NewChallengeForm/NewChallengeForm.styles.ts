import { StyleSheet, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'

const styles = StyleSheet.create({
  formView: {
    flex: 1,
    padding: 12,
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
    marginRight: 10,
  } as ViewStyle,
  datePickersRowView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
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
