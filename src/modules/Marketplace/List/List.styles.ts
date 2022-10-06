import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'

//import { FontWeights } from '~/components/Typography'
import { CIRCULAR_RADIUS_DIVISOR } from '~/styles/styles.constants'
import { applyAlphaToHex } from '~/styles/styles.utils'

import { Colors, colors } from '../../../styles'

const IMAGE_CONTAINER_SIZE = 30
const IMAGE_SIZE = 30

const styles = {
  item: {
    backgroundColor: colors[Colors.White],
    padding: 10,
    marginVertical: 8,
    width: '97%',
    height: 120,
    borderRadius: 25,
  },
  container: {
    // alignItems: 'center',
    // justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 100,
    flex: 1,
    width: '98%',
    borderRadius: 25,
    backgroundColor: colors[Colors.Transparent],
  } as ViewStyle,
  OrganizationInfoContainer: {
    flexDirection: 'row',
    height: 30,
  } as ViewStyle,
  nameContainer: {
    width: '90%',
    padding: 5,
    marginHorizontal: 15,
  } as ViewStyle,
  name: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: colors[Colors.PrimaryPurple],
  } as TextStyle,
  imageViewContainer: {
    borderRadius: 10,
    height: IMAGE_CONTAINER_SIZE,
    width: IMAGE_CONTAINER_SIZE,
  } as ViewStyle,
  profileImage: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / CIRCULAR_RADIUS_DIVISOR,
  } as ImageStyle,
  descriptionContainer: {
    textAlignVertical: 'center',
    width: '100%',
    height: 25,
    padding: 5,
    marginVertical: 10,
    // backgroundColor: colors[Colors.PrimaryRed],
  } as ViewStyle,
  description: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: colors[Colors.DarkGrey02],
  } as TextStyle,
  tokensView: {
    backgroundColor: applyAlphaToHex(colors[Colors.PrimaryYellow])(0.15),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 1,
    paddingHorizontal: 10,
    borderRadius: 11,
    marginHorizontal: 150,
  } as ViewStyle,
  tokenAmount: {
    paddingLeft: 4,
  } as TextStyle,
}
export default StyleSheet.create(styles)
