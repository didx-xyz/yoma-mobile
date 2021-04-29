import { StyleSheet, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'

const styles = {
  container: {
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderTopWidth: 1,
    borderColor: colors[Colors.lightGrey],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as ViewStyle,
}

export default StyleSheet.create(styles)