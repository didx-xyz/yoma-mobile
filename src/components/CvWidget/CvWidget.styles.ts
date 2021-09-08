import { StyleSheet, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'

const styles = {
  container: {
    backgroundColor: colors[Colors.White],
    borderRadius: 12,
    marginTop: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingBottom: 0,
  } as ViewStyle,
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
