import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'

import * as StyleUtils from '../../styles/styles.utils'

const styles = {
  container: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: colors[Colors.White],
    marginHorizontal: 10,
    marginBottom: 12,
    minHeight: 80,
    ...StyleUtils.dropShadow(5.14, 5.14, 23.14, Colors.PrimaryDarkGrey, 7),
  } as ViewStyle,
  description: {
    marginTop: 7,
  } as TextStyle,
}

export default StyleSheet.create(styles)
