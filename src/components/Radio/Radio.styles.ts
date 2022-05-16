import { StyleSheet, ViewStyle } from 'react-native'

import { Colors, colors } from '~/styles'

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors[Colors.MenuGrey],
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  selected: {
    width: 14,
    height: 14,
    backgroundColor: colors[Colors.PrimaryBlue],
    borderRadius: 7,
  } as ViewStyle,
})

export default styles
