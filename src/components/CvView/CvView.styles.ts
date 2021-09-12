import { StyleSheet, ViewStyle } from 'react-native'

import { Colors, colors } from '../../styles'

const styles = {
  container: {
    backgroundColor: colors[Colors.BackgroundGrey],
  } as ViewStyle,
  content: {
    paddingTop: 0,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
