import { StyleSheet, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'

const styles = {
  container: {
    backgroundColor: colors[Colors.White],
    borderRadius: 12,
    elevation: 3,
    margin: 10,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
