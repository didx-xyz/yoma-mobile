import { StyleSheet, ViewStyle } from 'react-native'

import { Colors, colors } from '~/styles'

const styles = {
  container: {
    elevation: 3,
    backgroundColor: colors[Colors.White],
    borderRadius: 15,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
