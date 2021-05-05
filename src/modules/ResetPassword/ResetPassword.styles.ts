import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'

const styles = {
  container: {
    paddingBottom: 30,
  } as ViewStyle,
  purpleSemiCircleContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  } as ViewStyle,
  whiteCard: {
    backgroundColor: colors[Colors.white],
    marginHorizontal: 13,
    marginTop: '-20%',
    borderRadius: 12,
    paddingVertical: 10,
    elevation: 3,
  } as ViewStyle,
  cardHeader: {
    paddingTop: 10,
    paddingBottom: 15,
  },
  bodyText: {
    marginVertical: 15,
    paddingHorizontal: 20,
  } as TextStyle,
}

export default StyleSheet.create(styles)
