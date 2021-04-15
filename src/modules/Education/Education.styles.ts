import { ImageStyle, StyleSheet, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'

const styles = {
  container: {
    backgroundColor: colors[Colors.backgroundGrey],
    ...StyleSheet.absoluteFillObject,
  } as ViewStyle,
  whiteCard: {
    backgroundColor: colors[Colors.white],
    width: '95%',
    borderRadius: 12,
    paddingVertical: 20,
    elevation: 3,
    alignItems: 'center',
    marginVertical: 10,
    alignSelf: 'center',
  } as ViewStyle,

  cardView: {
    backgroundColor: colors[Colors.white],
    width: '95%',
    borderRadius: 12,
    padding: 10,
    elevation: 3,
    marginVertical: 10,
    alignSelf: 'center',
  } as ViewStyle,
  row: {
    flexDirection: 'row',
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
    backgroundColor: colors[Colors.menuGrey],
    marginHorizontal: 10,
  } as ViewStyle,
  editIcon: {
    backgroundColor: colors[Colors.white],
    elevation: 3,
    height: 25,
    width: 25,
    borderRadius: 13,
    position: 'absolute',
    right: 10,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
