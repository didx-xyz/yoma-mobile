import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

const styles = {
  container: {
    paddingBottom: 30,
  } as ViewStyle,
  purpleSemiCircleContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  } as ViewStyle,
  card: {
    marginTop: -75,
  } as ViewStyle,
  cardHeader: {
    marginTop: 17,
  },
  bodyText: {
    marginVertical: 15,
    paddingHorizontal: 20,
  } as TextStyle,
}

export default StyleSheet.create(styles)
