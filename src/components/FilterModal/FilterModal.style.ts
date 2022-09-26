import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { Colors, utils as StyleUtils, colors } from '~/styles'
import fontStyles from '~/styles/font.styles'

const styles = StyleSheet.create({
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: StyleUtils.applyAlphaToHex(colors[Colors.Black], 0.5),
  } as ViewStyle,
  modal: {
    backgroundColor: colors[Colors.LightWhite],
    margin: 10,
    marginTop: 40,
    borderRadius: 12,
    overflow: 'hidden',
    ...StyleSheet.absoluteFillObject,
  } as ViewStyle,
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    padding: 10,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  } as ViewStyle,
  modalHeaderTitle: {
    color: '#41204B',
    fontFamily: fontStyles.bold,
    fontSize: 20,
  } as ViewStyle,
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 60,
  } as ViewStyle,
  emptyView: {
    width: 60,
  } as ViewStyle,
  Text: {
    color: '#0B4ED5',
    fontFamily: fontStyles.medium,
    fontSize: 18,
  } as TextStyle,
  filterItemContainer: {
    padding: 10,
    backgroundColor: colors[Colors.White],
  } as ViewStyle,
  fitlerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  } as ViewStyle,
  filterItemView: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  countView: {
    flexDirection: 'row',
    marginRight: 15,
  } as ViewStyle,
  countText: {
    marginLeft: -15,
    marginTop: -3,
    color: 'white',
  } as TextStyle,
  verticalLine: {
    height: 0.5,
    backgroundColor: colors[Colors.MenuGrey],
  } as ViewStyle,
})

export default styles
