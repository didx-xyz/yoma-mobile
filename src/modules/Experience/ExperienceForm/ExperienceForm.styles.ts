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
  tag: {
    backgroundColor: '#72C8ED15',
    borderRadius: 10,
    padding: 10,
    margin: 2,
  } as ViewStyle,
  textTag: {
    color: '#4CADE9',
  } as TextStyle,
  formDropDown: {
    borderColor: colors[Colors.tertiary9],
    width: '90%',
    alignSelf: 'center',
    borderWidth: 0,
    borderBottomWidth: 1,
  } as ViewStyle,
})

export default styles
