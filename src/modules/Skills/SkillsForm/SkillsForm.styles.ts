import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'
import { applyAlphaToHex } from 'styles/styles.utils'

const styles = StyleSheet.create({
  outerContainer: {
    height: 300,
  } as ViewStyle,
  innerContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
    padding: 10,
  } as ViewStyle,
  autocompleteContainer: {
    marginHorizontal: 10,
  } as ViewStyle,
  itemText: {
    paddingVertical: 5,
    margin: 2,
  } as TextStyle,
  tag: {
    backgroundColor: applyAlphaToHex(colors[Colors.secondaryBlue])(0.15),
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
  inputContainerStyle: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: colors[Colors.menuGrey],
  } as ViewStyle,
})

export default styles
