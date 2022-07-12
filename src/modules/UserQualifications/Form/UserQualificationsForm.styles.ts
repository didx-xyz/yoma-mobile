import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { Colors, colors } from '~/styles'
import { applyAlphaToHex } from '~/styles/styles.utils'

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors[Colors.BackgroundGrey],
  } as ViewStyle,
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  } as ViewStyle,
  bottom: {
    borderTopWidth: 1,
    borderColor: applyAlphaToHex(colors[Colors.MenuGrey])(0.7),
    marginTop: 10,
  } as ViewStyle,
  bottomText: {
    marginVertical: 10,
  } as TextStyle,
})

export default styles
