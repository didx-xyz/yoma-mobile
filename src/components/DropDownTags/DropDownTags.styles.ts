import { StyleSheet, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'
import { applyAlphaToHex } from 'styles/styles.utils'

const styles = {
  dropDown: {
    borderWidth: 0,
    borderBottomWidth: 1,
  } as ViewStyle,
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
  dropDownContainer: {
    height: 45,
  } as ViewStyle,
  item: {
    justifyContent: 'flex-start',
  } as ViewStyle,
}

export default StyleSheet.create(styles)
