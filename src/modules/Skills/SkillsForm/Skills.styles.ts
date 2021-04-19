import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
    backgroundColor: colors[Colors.white],
    margin: 10,
    padding: 10,
    borderRadius: 12,
  } as ViewStyle,
  autocompleteContainer: {
    marginHorizontal: 10,
  } as ViewStyle,
  itemText: {
    paddingVertical: 5,
    margin: 2,
  } as TextStyle,
  tag: {
    backgroundColor: `${colors[Colors.secondaryBlue]}15`,
    borderRadius: 20,
    padding: 10,
    margin: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as ViewStyle,
  crossIcon: {
    marginRight: 5,
  } as ViewStyle,
})

export default styles
