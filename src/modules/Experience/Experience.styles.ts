import { StyleSheet, ViewStyle } from 'react-native'

import { Colors, colors } from '../../styles'

const styles = {
  container: {
    backgroundColor: colors[Colors.BackgroundGrey],
  } as ViewStyle,
  listContainer: {
    paddingTop: 10,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
