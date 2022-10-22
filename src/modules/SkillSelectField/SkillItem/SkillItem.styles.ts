import { StyleSheet, ViewStyle } from 'react-native'

import { Colors, colors } from '~/styles'

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors[Colors.LightGrey],
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignContent: 'center',
  } as ViewStyle,
  hStack: {
    alignItems: 'center',
  } as ViewStyle,
})

export default styles
