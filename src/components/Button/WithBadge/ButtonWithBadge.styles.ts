import { StyleSheet, ViewStyle } from 'react-native'

import { Colors, colors } from '~/styles'
import { utils as StyleUtils } from '~/styles'

const styles = {
  button: {
    flexDirection: 'row',
    height: 40,
    borderRadius: 1,
    alignItems: 'center',
    paddingLeft: 8,
    position: 'relative',
  } as ViewStyle,
  badge: {
    ...StyleUtils.dropShadow(-1.69, 6.77, 14.55, Colors.Black, 3),
    backgroundColor: colors[Colors.White],
    borderRadius: 20,
    marginRight: 8,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
