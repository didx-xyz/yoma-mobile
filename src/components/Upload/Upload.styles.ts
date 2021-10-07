import { StyleSheet, ViewStyle } from 'react-native'

import { Colors, colors } from '~/styles'

const styles = {
  inner: {
    flexDirection: 'row',
    backgroundColor: colors[Colors.LightGrey],
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 6,
    justifyContent: 'space-between',
    marginVertical: 10,
  } as ViewStyle,
  button: {
    backgroundColor: colors[Colors.White],
    paddingHorizontal: 15,
    borderRadius: 25,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
