import { StyleSheet, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'

const styles = {
  textInput: {
    backgroundColor: colors[Colors.lightGrey],
    marginHorizontal: 15,
    borderRadius: 60,
    marginTop: 10,
    paddingLeft: 20,
    height: 45,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
