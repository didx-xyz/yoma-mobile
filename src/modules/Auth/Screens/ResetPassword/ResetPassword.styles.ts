import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'

const styles = {
  text: {
    fontSize: 36,
    fontWeight: 'bold',
  } as TextStyle,
  purpleSemiCircleContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  } as ViewStyle,
  whiteCard: {
    backgroundColor: colors[Colors.white],
    alignSelf: 'center',
    marginTop: '-20%',
    width: '90%',
    alignItems: 'center',
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
