import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { CIRCULAR_RADIUS_DIVISOR } from '~/styles/styles.constants'
import { applyAlphaToHex } from '~/styles/styles.utils'

import { Colors, colors } from '../../../styles'

const IMAGE_CONTAINER_SIZE = 40
const PROFILE_IMAGE_SIZE = 35

const styles = {
  item: {
    backgroundColor: colors[Colors.White],
    padding: 10,
    marginVertical: 8,
    height: 170,
    borderRadius: 25,
  },
  OrganizationInfoContainer: {
    flexDirection: 'row',
    height: 25,
  } as ViewStyle,
  nameContainer: {
    width: '90%',
    padding: 5,
  } as ViewStyle,
  name: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: colors[Colors.DarkGrey02],
  } as TextStyle,
  imageViewContainer: {
    borderRadius: 10,
    height: IMAGE_CONTAINER_SIZE,
    width: IMAGE_CONTAINER_SIZE,
  } as ViewStyle,
  profileImage: {
    height: PROFILE_IMAGE_SIZE,
    width: PROFILE_IMAGE_SIZE,
    borderRadius: PROFILE_IMAGE_SIZE / CIRCULAR_RADIUS_DIVISOR,
  } as ImageStyle,
  titleViewContainer: {
    textAlignVertical: 'center',
    width: '100%',
    height: 50,
    padding: 5,
  } as ViewStyle,
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: colors[Colors.PrimaryPurple],
  } as TextStyle,
  scrollInnerContainer: {
    paddingVertical: 15,
  } as ViewStyle,
  biographyContainer: {
    textAlignVertical: 'center',
    width: '100%',
    height: 42,
    padding: 5,
  } as ViewStyle,
  biography: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: colors[Colors.DarkGrey02],
  } as TextStyle,
  bottomContainer: {
    marginVertical: 2,
    flexDirection: 'row',
    width: '100%',
    height: 42,
  } as ViewStyle,
  bottomLeftView: {
    width: '75%',
    height: 42,
  } as ViewStyle,
  bottomText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 11,
    color: colors[Colors.MenuGrey],
  } as TextStyle,
  tokensView: {
    backgroundColor: applyAlphaToHex(colors[Colors.PrimaryYellow])(0.15),
    flexDirection: 'row',
    alignItems: 'center',
    width: 54,
    justifyContent: 'center',
    paddingVertical: 1,
    paddingHorizontal: 5,
    borderRadius: 11,
    height: 20,
    top: 10,
    marginLeft: 35,
  } as ViewStyle,
  tokenAmount: {
    paddingLeft: 4,
  } as TextStyle,
}
export default StyleSheet.create(styles)