import { StyleSheet, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'

const styles = {
  container: {
    backgroundColor: colors[Colors.white],
    borderRadius: 12,
    marginTop: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
