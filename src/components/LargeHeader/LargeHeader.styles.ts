import { StyleSheet, ViewStyle } from 'react-native'

const ICON_SIZE = 50

const styles = {
  container: {
    height: 225,
  } as ViewStyle,
  logo: {
    alignSelf: 'center',
  } as ViewStyle,
  backIcon: {
    height: ICON_SIZE,
    width: ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
}

export default StyleSheet.create(styles)
