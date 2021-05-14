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
  addButton: {
    flexDirection: 'row',
    paddingRight: 40,
  } as ViewStyle,
  addIcon: {
    backgroundColor: colors[Colors.white],
    elevation: 3,
    borderRadius: 10,
    position: 'absolute',
    right: 0,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 10,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
