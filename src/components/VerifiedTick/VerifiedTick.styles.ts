import { StyleSheet, ViewStyle } from 'react-native'

import { Colors, colors } from '../../styles'

const styles = {
  container: {
    width: 13,
    height: 13,
    borderRadius: 8,
    backgroundColor: colors[Colors.primaryRed],
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
}

export default StyleSheet.create(styles)
