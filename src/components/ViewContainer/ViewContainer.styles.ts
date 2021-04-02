import { StyleSheet, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'

const styles = {
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    backgroundColor: colors[Colors.white],
  } as ViewStyle,
}

export default StyleSheet.create(styles)
