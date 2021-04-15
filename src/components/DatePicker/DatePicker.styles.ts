import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'

const styles = {
  datePickerOuterView: {
    width: '95%',
    alignSelf: 'center',
  } as ViewStyle,
  label: {
    marginLeft: 10,
  } as TextStyle,
  textInputStyle: {
    width: '95%',
    alignSelf: 'center',
    height: 35,
    padding: 0,
    borderBottomWidth: 1,
    paddingHorizontal: 0,
    borderColor: colors[Colors.menuGrey],
  } as ViewStyle,
  dateInput: {
    paddingLeft: 10,
    alignItems: 'flex-start',
    borderWidth: 0,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
