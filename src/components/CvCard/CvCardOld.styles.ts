import { StyleSheet, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'

const styles = {
  container: {
    backgroundColor: colors[Colors.white],
    borderRadius: 12,
    marginTop: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
    height: 175,
  } as ViewStyle,
  listCard: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  dividerLine: {
    height: 2,
    backgroundColor: colors[Colors.backgroundGrey],
  } as ViewStyle,
  bodyView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  editIcon: {
    elevation: 3,
    backgroundColor: colors[Colors.white],
    borderRadius: 15,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
