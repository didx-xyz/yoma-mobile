import { Dimensions, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  checkBoxView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
  } as ViewStyle,
  formDropDown: {
    borderColor: colors[Colors.tertiary9],
    width: '90%',
    alignSelf: 'center',
    borderWidth: 0,
    borderBottomWidth: 1,
  } as ViewStyle,
  checkBox: {
    marginRight: 10,
  } as ViewStyle,
})

export default styles
