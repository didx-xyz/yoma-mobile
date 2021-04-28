import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'
import { applyAlphaToHex } from 'styles/styles.utils'

const styles = {
  formView: {
    flex: 1,
    height: 600,
    padding: 12,
  } as ViewStyle,
  checkBoxView: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  formDropDown: {
    alignSelf: 'center',
    borderWidth: 0,
    borderBottomWidth: 1,
    paddingLeft: 0,
  } as ViewStyle,
  checkBox: {
    paddingRight: 10,
  } as ViewStyle,
  datePickersRowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  } as ViewStyle,
  placeholder: {
    color: colors[Colors.menuGrey],
    marginLeft: 0,
  } as ViewStyle,
  bottomView: {
    borderTopWidth: 1,
    borderColor: applyAlphaToHex(colors[Colors.menuGrey])(0.7),
    marginTop: 10,
  } as ViewStyle,
  bottomText: {
    marginVertical: 10,
  } as TextStyle,
}

export default StyleSheet.create(styles)
