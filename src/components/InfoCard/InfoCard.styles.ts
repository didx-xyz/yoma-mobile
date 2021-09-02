import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'
import { CIRCULAR_RADIUS_DIVISOR } from 'styles/styles.constants'

const IMAGE_SIZE = 35

const styles = {
  container: {
    padding: 10,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: colors[Colors.White],
    marginHorizontal: 10,
    marginBottom: 10,
  } as ViewStyle,
  title: {
    width: 200,
  },
  row: {
    flexDirection: 'row',
    marginTop: 5,
  } as ViewStyle,
  image: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    marginRight: 10,
    borderRadius: IMAGE_SIZE / CIRCULAR_RADIUS_DIVISOR,
  } as ImageStyle,
  avatar: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / CIRCULAR_RADIUS_DIVISOR,
    backgroundColor: colors[Colors.PrimaryGreen],
    marginRight: 10,
  } as ViewStyle,
  editIcon: {
    backgroundColor: colors[Colors.White],
    elevation: 3,
    borderRadius: 13,
    position: 'absolute',
    right: 10,
  } as ViewStyle,
  description: {
    marginTop: 7,
  } as TextStyle,
}

export default StyleSheet.create(styles)
