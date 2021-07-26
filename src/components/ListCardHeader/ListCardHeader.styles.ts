import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { Colors, colors } from '../../styles'

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    flex: 1,
  } as ViewStyle,
  header: {
    marginLeft: 10,
  } as TextStyle,
  border: {
    borderBottomWidth: 2,
    borderBottomColor: colors[Colors.backgroundGrey],
  } as ViewStyle,
  rightAccessory: {
    marginLeft: 'auto',
  } as ViewStyle,
}

export default StyleSheet.create(styles)
