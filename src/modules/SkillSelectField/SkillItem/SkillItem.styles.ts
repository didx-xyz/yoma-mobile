import { StyleSheet, ViewStyle } from 'react-native'

import { Colors, colors } from '~/styles'

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors[Colors.LightGrey],
    paddingVertical: 20,
    paddingHorizontal: 10,
  } as ViewStyle,
})

export default styles
