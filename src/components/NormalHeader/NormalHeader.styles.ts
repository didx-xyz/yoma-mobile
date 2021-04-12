import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { colors, Colors } from '../../styles'

const styles = {
  header: {
    height: 50,
    backgroundColor: colors[Colors.white],
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  } as ViewStyle,
  saveText: {
    paddingRight: 20,
  } as TextStyle,
}

export default StyleSheet.create(styles)
