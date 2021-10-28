import { StyleSheet, ViewStyle } from 'react-native'

import { Colors, colors } from '~/styles'

const styles = {
  container: {
    marginBottom: 16,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors[Colors.MenuGrey],
  } as ViewStyle,
}

export default StyleSheet.create(styles)
