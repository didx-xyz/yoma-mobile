import { StyleSheet, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'

const styles = {
  cardView: {
    backgroundColor: colors[Colors.white],
    borderRadius: 25,
    overflow: 'hidden',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    marginHorizontal: 10,
    height: 175,
  } as ViewStyle,
  certificateCountView: {
    height: 25,
    width: 25,
    maxWidth: 30,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 12,
    marginRight: 10,
  } as ViewStyle,
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  editIcon: {
    elevation: 3,
    backgroundColor: colors[Colors.white],
    borderRadius: 15,
    position: 'absolute',
    right: 0,
  } as ViewStyle,
  dividerLine: {
    height: 2,
    backgroundColor: colors[Colors.backgroundGrey],
    marginVertical: 10,
  } as ViewStyle,
  bodyView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
}

export default StyleSheet.create(styles)
