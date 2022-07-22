import { StyleSheet, ViewStyle } from 'react-native'

import { Colors, colors } from '../../styles'

const styles = {
  container: {
    backgroundColor: colors[Colors.Transparent],
    alignItems: 'stretch',
    // justifyContent: 'center',
  } as ViewStyle,
  scrollInnerContainer: {
    paddingVertical: 15,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
