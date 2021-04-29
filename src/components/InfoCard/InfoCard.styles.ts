import { ImageStyle, StyleSheet, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'

const styles = {
  cardView: {
    padding: 10,
    elevation: 3,
  } as ViewStyle,
  row: {
    flexDirection: 'row',
    marginVertical: 5,
  } as ViewStyle,
  image: {
    height: 35,
    width: 35,
    marginHorizontal: 10,
  } as ImageStyle,
  avatar: {
    height: 35,
    width: 35,
    borderRadius: 17,
    backgroundColor: colors[Colors.primaryGreen],
    marginHorizontal: 10,
  } as ViewStyle,
  editIcon: {
    backgroundColor: colors[Colors.white],
    elevation: 3,
    borderRadius: 13,
    position: 'absolute',
    right: 10,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
