import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { colors, Colors } from '../../styles'

const styles = {
  header: {
    height: 50,
    backgroundColor: colors[Colors.white],
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  } as ViewStyle,
  saveText: {
    paddingRight: 20,
  } as TextStyle,
  button: {
    flexDirection: 'row',
    paddingRight: 20,
  } as ViewStyle,
  addIcon: {
    backgroundColor: colors[Colors.white],
    marginLeft: 10,
    elevation: 3,
    borderRadius: 10,
  },
}

export default StyleSheet.create(styles)
