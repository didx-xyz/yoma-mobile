import { StyleSheet, ViewStyle } from 'react-native'

const styles = {
  container: {
    flex: 1,
  } as ViewStyle,
  divider: {
    paddingRight: 25,
  } as ViewStyle,
  listContainer: { flex: 1, position: 'relative' } as ViewStyle,
  itemContainer: {
    paddingVertical: 8,
  } as ViewStyle,
  alphabeticNavContainer: {
    position: 'absolute',
    right: 5,
    top: 0,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
