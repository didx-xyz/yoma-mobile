import { StyleSheet, ViewStyle } from 'react-native'

import { Colors, utils as StyleUtils, colors } from '~/styles'

const styles = {
  container: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: colors[Colors.White],
    marginHorizontal: 10,
    marginTop: 12,
    marginBottom: 12,
    minHeight: 80,
    ...StyleUtils.dropShadow(5.14, 5.14, 23.14, Colors.PrimaryDarkGrey, 7),
  } as ViewStyle,
}

export default StyleSheet.create(styles)
