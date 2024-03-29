import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

const styles = {
  container: {
    paddingVertical: 8,
    paddingHorizontal: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  } as ViewStyle,
  content: {
    padding: 0,
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  flag: {
    paddingRight: 8,
  } as TextStyle,
}

export default StyleSheet.create(styles)
