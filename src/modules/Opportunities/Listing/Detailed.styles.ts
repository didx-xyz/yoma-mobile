import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { CIRCULAR_RADIUS_DIVISOR } from '~/styles/styles.constants'

import { Colors, colors } from '../../../styles'

const IMAGE_CONTAINER_SIZE = 40
const PROFILE_IMAGE_SIZE = 35

const styles = {
  container: {
    backgroundColor: colors[Colors.Transparent],
    alignItems: 'stretch',
    justifyContent: 'center',
  } as ViewStyle,
  bgContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: colors[Colors.PrimaryGreen],
    height: 227,
    overflow: 'hidden',
  } as ViewStyle,
  bgCircle: {
    position: 'absolute',
    top: 68,
    right: 0,
  } as ImageStyle,
  OrganizationInfoContainer: {
    flexDirection: 'row',
    height: 31,
    top: 10,
    left: 23,
  } as ViewStyle,
  nameContainer: {
    width: 120,
    padding: 5,
    height: 30,
  } as ViewStyle,
  name: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: colors[Colors.White],
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
    height: 81,
    top: 10,
    padding: 5,
    left: 23,
  } as ViewStyle,
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 25,
    color: colors[Colors.White],
  } as TextStyle,
  bottomContainer: {
    padding: 10,
    flexDirection: 'column',
    width: '70%',
    height: 50,
    left: 23,
    color: colors[Colors.PrimaryRed],
  } as ViewStyle,
  bottomText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 11,
    color: colors[Colors.White],
  } as TextStyle,
  tokensView: {
    backgroundColor: colors[Colors.Yellow],
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 1,
    width: 55,
    left: 280,
    right: 10,
    height: 20,
    top: -10,
    padding: 5,
    borderRadius: 11,
    // marginHorizontal: 18,
    // marginVertical: 15,
  } as ViewStyle,
  tokenAmount: {
    paddingLeft: 4,
  } as TextStyle,
  container1: {
    alignItems: 'stretch',
    //justifyContent: 'center',
    //marginHorizontal: 10,
    marginTop: -10,
    left: 15,
    right: 15,
    paddingRight: 10,
    paddingLeft: 10,
    //height: 700,
    width: '93%',
    borderRadius: 25,
    borderColor: 'black',
    backgroundColor: colors[Colors.White],
  } as ViewStyle,
  scrollInnerContainer: {
    paddingVertical: 15,
  } as ViewStyle,
  biographyContainer: {
    top: 0,
    alignItems: 'stretch',
    width: '99%',
    //padding: 10,
  } as ViewStyle,
  biography: {
    alignItems: 'stretch',
    justifyContent: 'center',
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: colors[Colors.DarkGrey02],
  } as TextStyle,
  button: {
    top: 10,
    height: 45,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '99%',
    backgroundColor: colors[Colors.PrimaryGreen],
  } as ViewStyle,
  btnText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: colors[Colors.White],
  } as TextStyle,
  buttonComplete: {
    marginVertical: 10,
    top: 10,
    height: 45,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '99%',
    borderWidth: 2,
    borderColor: colors[Colors.PrimaryGreen],
  } as ViewStyle,
  btnCompleteText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: colors[Colors.PrimaryGreen],
  } as TextStyle,
  btn: {
    color: colors[Colors.White],
  } as ViewStyle,
}
export default StyleSheet.create(styles)
