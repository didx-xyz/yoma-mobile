import { StyleSheet, ViewStyle } from 'react-native'

import { Colors, colors } from '~/styles'

const styles = {
  container: {
    height: 48,
    margin: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors[Colors.LightGrey],
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  } as ViewStyle,
}

export default StyleSheet.create(styles)
