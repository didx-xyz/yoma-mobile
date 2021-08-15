import { StyleSheet, ViewStyle } from 'react-native'

import { colors, Colors } from '../../styles'
import { CIRCULAR_RADIUS_DIVISOR } from '../../styles/styles.constants'
import { AVATAR_SIZE } from './Avatar.constants'

const styles = {
  container: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: AVATAR_SIZE / CIRCULAR_RADIUS_DIVISOR,
    backgroundColor: colors[Colors.lightGrey],
  } as ViewStyle,
}

export default StyleSheet.create(styles)
