import { StyleSheet, ViewStyle } from 'react-native'

import { Colors, utils as StyleUtils, colors } from '~/styles'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  } as ViewStyle,
  add: {
    backgroundColor: StyleUtils.applyAlphaToHex(colors[Colors.PrimaryDarkGrey])(0.15),
    borderRadius: 33,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 20,
  } as ViewStyle,
})

export default styles
