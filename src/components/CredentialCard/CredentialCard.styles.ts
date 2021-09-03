import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'

const styles = {
  container: {
    padding: 10,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: colors[Colors.White],
    marginHorizontal: 10,
    marginBottom: 10,
  } as ViewStyle,
  description: {
    marginTop: 7,
  } as TextStyle,
}

export default StyleSheet.create(styles)
