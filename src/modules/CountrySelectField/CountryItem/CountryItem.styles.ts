import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'

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
  icon: {
    alignSelf: 'flex-end',
    transform: [{ rotate: '-90deg' }],
  } as ImageStyle,
}

export default StyleSheet.create(styles)
