import { StyleSheet, ViewStyle } from 'react-native'

import { Colors, utils as StyleUtils, colors } from '~/styles'

const styles = StyleSheet.create({
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: StyleUtils.applyAlphaToHex(colors[Colors.Black], 0.5),
  } as ViewStyle,
  modal: {
    backgroundColor: colors[Colors.White],
    padding: 5,
    margin: 10,
    marginTop: 40,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: colors[Colors.White],
    ...StyleSheet.absoluteFillObject,
  } as ViewStyle,
  button: {
    alignSelf: 'flex-end',
    marginRight: 0,
  } as ViewStyle,
})

export default styles
