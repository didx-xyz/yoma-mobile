import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { colors, Colors } from '../../styles'

const dropShadow = {
  elevation: 3,
  shadowColor: colors[Colors.black],
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,
}

const styles = {
  container: {
    ...dropShadow,
    height: 50,
    backgroundColor: colors[Colors.white],
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    elevation: 3,
  } as ViewStyle,
  saveText: {
    paddingRight: 20,
  } as TextStyle,
  button: {
    flexDirection: 'row',
    paddingRight: 20,
  } as ViewStyle,
  addIcon: {
    ...dropShadow,
    backgroundColor: colors[Colors.white],
    marginLeft: 10,
    borderRadius: 10,
  },
}

export default StyleSheet.create(styles)
