import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'

const styles = {
  container: {
    height: 45,
    marginTop: 10,
  } as ViewStyle,
  dropDown: {
    marginHorizontal: 13,
    borderWidth: 0,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    height: 45,
    backgroundColor: colors[Colors.lightGrey],
  } as ViewStyle,
  dropDownView: {
    backgroundColor: colors[Colors.lightGrey],
  } as ViewStyle,
  item: {
    justifyContent: 'flex-start',
  } as ViewStyle,
  label: {
    marginLeft: 10,
  } as TextStyle,
}

export default StyleSheet.create(styles)
