import { StyleSheet, ViewStyle } from 'react-native'

import { Colors, colors } from '../../styles'

const styles = {
  container: {
    margin: 0,
    borderBottomWidth: 1,
    height: 48,
    justifyContent: 'center',
    borderBottomColor: colors[Colors.LightGrey],
  } as ViewStyle,
}

export default StyleSheet.create(styles)
