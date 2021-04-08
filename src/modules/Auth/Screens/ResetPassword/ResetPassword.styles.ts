import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

const styles = {
  container: {
    ...StyleSheet.absoluteFillObject,
  } as ViewStyle,
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
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: '-20%',
    width: '90%',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 10,
    elevation: 3,
  } as ViewStyle,
  bodyText: {
    marginVertical: 15,
    textAlign: 'center',
    paddingHorizontal: 20,
  } as TextStyle,
}

export default StyleSheet.create(styles)
