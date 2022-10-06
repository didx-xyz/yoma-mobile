import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { Colors, colors } from '../../styles'

const styles = {
  container: {
    backgroundColor: colors[Colors.Transparent],
  } as ViewStyle,
  card: { padding: 15 } as ViewStyle,
  nameContainer: {
    alignItems: 'center',
    width: '90%',
    padding: 5,
    height: 30,
  } as ViewStyle,
  verticalLine: {
    borderWidth: 0.3,
    marginTop: 40,
    marginBottom: 5,
    width: '100%',
    alignSelf: 'center',
    borderColor: Colors.MenuGrey,
  } as ViewStyle,
  name: {
    fontFamily: 'Montserrat-Medium',
    color: colors[Colors.PrimaryPurple],
  } as TextStyle,
  title: {
    marginTop: 10,
    width: '65%',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: colors[Colors.PrimaryPurple],
  } as TextStyle,
  text: {
    width: '65%',
    marginTop: 10,
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: colors[Colors.PrimaryDarkGrey],
  } as TextStyle,
  linkStyle: {
    width: '100%',
    fontSize: 15,
    textAlign: 'auto',
  } as TextStyle,
  checkBox: {
    marginVertical: 10,
  } as ViewStyle,
  buttonStyle: {
    marginLeft: 0,
    width: '100%',
    alignSelf: 'flex-start',
  } as ViewStyle,
}
export default StyleSheet.create(styles)
