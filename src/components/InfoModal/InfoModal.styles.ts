import { StyleSheet, ViewStyle, TextStyle } from 'react-native'

import { colors, Colors } from '../../styles'

const styles = {
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  } as ViewStyle,
  modalView: {
    margin: 20,
    backgroundColor: colors[Colors.white],
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  } as ViewStyle,
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: colors[Colors.primaryGreen],
  } as ViewStyle,
}

export default StyleSheet.create(styles)
