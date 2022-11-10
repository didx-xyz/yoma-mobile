import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { Colors, colors } from '~/styles'

const dropShadow = {
  elevation: 3,
  shadowColor: colors[Colors.Black],
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,
}

const styles = {
  container: {
    ...dropShadow,
    height: 50,
    backgroundColor: colors[Colors.White],
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  } as ViewStyle,
  containerCombined: {
    paddingHorizontal: 20,
    height: 50,
    backgroundColor: colors[Colors.PrimaryGreen],
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  } as ViewStyle,
  headerText: {
    flex: 1,
    position: 'absolute',
    textAlign: 'center',
    width: '100%',
  } as TextStyle,
  saveText: {
    paddingRight: 20,
  } as TextStyle,
  button: {
    flexDirection: 'row',
    paddingRight: 20,
  } as ViewStyle,
  addButton: {
    flexDirection: 'row',
    paddingRight: 40,
  } as ViewStyle,
  addIcon: {
    ...dropShadow,
    backgroundColor: colors[Colors.White],
    marginLeft: 10,
    borderRadius: 10,
    position: 'absolute',
    right: 0,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 10,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
