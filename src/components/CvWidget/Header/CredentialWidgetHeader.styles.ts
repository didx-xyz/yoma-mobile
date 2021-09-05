import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { Colors, colors } from '../../../styles'

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
    borderBottomColor: colors[Colors.BackgroundGrey],
  } as ViewStyle,
  actionItem: {
    marginLeft: 'auto',
    zIndex: 10,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
