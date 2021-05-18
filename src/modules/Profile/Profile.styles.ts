import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { CIRCULAR_RADIUS_DIVISOR } from 'styles/styles.constants'

import { Colors, colors } from '../../styles'

const IMAGE_CONTAINER_SIZE = 75
const PROFILE_IMAGE_SIZE = 70

const styles = {
  container: {
    backgroundColor: colors[Colors.backgroundGrey],
  } as ViewStyle,
  card: {
    paddingVertical: 24,
    marginTop: 50,
    paddingHorizontal: 13,
  } as ViewStyle,
  imageContainer: {
    marginTop: -50,
    alignItems: 'center',
    justifyContent: 'center',
    height: IMAGE_CONTAINER_SIZE,
    width: IMAGE_CONTAINER_SIZE,
    alignSelf: 'center',
  } as ViewStyle,
  profileImage: {
    height: PROFILE_IMAGE_SIZE,
    width: PROFILE_IMAGE_SIZE,
    borderRadius: PROFILE_IMAGE_SIZE / CIRCULAR_RADIUS_DIVISOR,
  } as ImageStyle,
  editIcon: {
    elevation: 3,
    backgroundColor: colors[Colors.white],
    borderRadius: 15,
    position: 'absolute',
    right: 0,
    bottom: -5,
  } as ViewStyle,
  imagePlaceholder: {
    marginTop: -50,
    alignSelf: 'center',
  } as ViewStyle,
  logout: {
    marginVertical: 17,
  } as TextStyle,
}

export default StyleSheet.create(styles)
