import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { Colors, colors } from '../../../styles'

const styles = {
  container: {
    backgroundColor: colors[Colors.Transparent],
    alignItems: 'stretch',
    //justifyContent: 'center',
  } as ViewStyle,
  viewcontainer: {
    alignItems: 'stretch',
    //justifyContent: 'center',
    //marginHorizontal: 10,
    marginVertical: 20,
    //marginTop: -10,
    left: 15,
    right: 15,
    padding: 10,
    width: '93%',
    borderRadius: 25,
    borderColor: 'black',
    backgroundColor: colors[Colors.White],
  } as ViewStyle,
  nameContainer: {
    alignItems: 'center',
    width: '90%',
    padding: 5,
    height: 30,
  } as ViewStyle,
  name: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: colors[Colors.PrimaryPurple],
  } as TextStyle,
  titleViewContainer: {
    textAlignVertical: 'center',
    width: '100%',
    height: 81,
    top: 10,
    padding: 5,
    left: 23,
  } as ViewStyle,
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 25,
    color: colors[Colors.PrimaryPurple],
  } as TextStyle,
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  } as ViewStyle,
}
export default StyleSheet.create(styles)
