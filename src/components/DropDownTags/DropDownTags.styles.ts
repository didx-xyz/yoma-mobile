import { StyleSheet, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'
import { applyAlphaToHex } from 'styles/styles.utils'

const styles = {
  dropDownStyle: {
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
  dropDownContainerStyle: {
    height: 20,
  } as ViewStyle,
  itemStyle: {
    justifyContent: 'flex-start',
  } as ViewStyle,
}

export default StyleSheet.create(styles)
