import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'
import { applyAlphaToHex } from 'styles/styles.utils'

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
  placeholderStyle: {
    color: colors[Colors.menuGrey],
    marginLeft: 0,
  } as ViewStyle,
  rowText: {
    width: '90%',
  } as TextStyle,
  bottomView: {
    borderTopWidth: 1,
    borderColor: applyAlphaToHex(colors[Colors.menuGrey])(0.7),
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  } as ViewStyle,
  bottomText: {
    marginVertical: 10,
  } as TextStyle,
})

export default styles
