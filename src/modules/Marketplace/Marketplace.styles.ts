import { ImageStyle, StyleSheet, ViewStyle } from 'react-native'

import { Colors, colors } from '~/styles'

const styles = {
  container: {
    backgroundColor: colors[Colors.Transparent],
    alignItems: 'stretch',
    justifyContent: 'center',
  } as ViewStyle,
  bgContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: colors[Colors.PrimaryPurple],
    height: 150,
    overflow: 'hidden',
  } as ViewStyle,
  bgCircle: {
    position: 'absolute',
    top: 30,
    right: -160,
  } as ImageStyle,
}

export default StyleSheet.create(styles)
