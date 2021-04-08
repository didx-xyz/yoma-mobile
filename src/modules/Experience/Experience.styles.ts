import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { Colors, colors } from '../../styles'

const styles = {
  container: {
    backgroundColor: colors[Colors.tertiary8],
    ...StyleSheet.absoluteFillObject,
  } as ViewStyle,
  whiteCard: {
    backgroundColor: colors[Colors.white],
    width: '95%',
    borderRadius: 12,
    paddingVertical: 20,
    elevation: 3,
    alignItems: 'center',
    marginVertical: 10,
    flex: 1,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
