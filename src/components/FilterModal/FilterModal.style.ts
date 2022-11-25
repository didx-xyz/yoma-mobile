import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { Colors, colors, FontFamily, utils as StyleUtils } from '~/styles'
import fontStyles from '~/styles/font.styles'

const styles = StyleSheet.create({
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: StyleUtils.applyAlphaToHex(colors[Colors.Black], 0.5),
  } as ViewStyle,
  modal: {
    backgroundColor: colors[Colors.LightWhite],
    marginTop: 40,
    borderRadius: 12,
    overflow: 'hidden',
    ...StyleSheet.absoluteFillObject,
  } as ViewStyle,
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingStart: 10,
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    marginBottom: 20,
  } as ViewStyle,
  modalHeaderTitle: {
    color: '#41204B',
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 16,
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
    color: '#387F6A',
    fontFamily: fontStyles.bold,
    fontWeight: '500',
    fontSize: 13,
  } as TextStyle,
  filterItemContainer: {
    paddingHorizontal: 10,
    // paddingVertical: 10,
    // paddingTop: 15,
  } as ViewStyle,
  newFilterItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  } as ViewStyle,
  fitlerItem: {
    // marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    // paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#DAE0ED',
  } as ViewStyle,
  itemText: {
    fontSize: 14,
    color: '#565B6F',
    fontFamily: 'Montserrat',
    fontWeight: '400',
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
