import { StyleSheet, ViewStyle } from 'react-native'

import { Colors, colors } from '~/styles'

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors[Colors.BackgroundGrey],
  } as ViewStyle,
  form: {
    padding: 12,
  } as ViewStyle,
})

export default styles
