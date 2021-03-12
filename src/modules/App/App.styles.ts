import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const styles = {
  scrollView: {
    backgroundColor: Colors.lighter,
  } as ViewStyle,
  engine: {
    position: 'absolute',
    right: 0,
  } as ViewStyle,
  body: {
    backgroundColor: Colors.white,
  } as ViewStyle,
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  } as ViewStyle,
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  } as TextStyle,
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  } as TextStyle,
  highlight: {
    fontWeight: '700',
  } as TextStyle,
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  } as TextStyle,
}
export default StyleSheet.create(styles)
