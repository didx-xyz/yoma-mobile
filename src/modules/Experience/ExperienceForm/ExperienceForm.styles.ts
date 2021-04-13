import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

const HEIGHT_OF_FORM_CARD = 600

const styles = StyleSheet.create({
  formView: {
    width: '100%',
    height: HEIGHT_OF_FORM_CARD,
  } as ViewStyle,
  checkBoxView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
  } as ViewStyle,
  formDropDown: {
    width: '90%',
    alignSelf: 'center',
    borderWidth: 0,
    borderBottomWidth: 1,
    paddingLeft: 0,
  } as ViewStyle,
  checkBox: {
    marginRight: 10,
  } as ViewStyle,
  useLocationText: {
    paddingRight: 20,
  } as TextStyle,
  datePickersRowView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  } as ViewStyle,
})

export default styles
