import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'

const styles = {
  textInputView: {
    width: '95%',
    alignSelf: 'center',
    marginVertical: 2,
  } as ViewStyle,
  label: {
    marginLeft: 10,
  } as TextStyle,
  textInputStyle: {
    width: '95%',
    alignSelf: 'center',
    padding: 0,
    borderBottomWidth: 1,
    borderColor: `${colors[Colors.menuGrey]}70`,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
