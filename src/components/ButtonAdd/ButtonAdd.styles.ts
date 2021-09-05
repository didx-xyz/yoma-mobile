import { StyleSheet, ViewStyle } from 'react-native'

import { Colors, colors } from '../../styles'
import * as StyleUtils from '../../styles/styles.utils'

const styles = {
  button: {
    flexDirection: 'row',
    paddingRight: 40,
  } as ViewStyle,
  badge: {
    ...StyleUtils.dropShadow(-1.69, 6.77, 14.55, Colors.Black, 3),
    backgroundColor: colors[Colors.White],
    marginLeft: 10,
    borderRadius: 10,
    position: 'absolute',
    right: 0,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 10,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
