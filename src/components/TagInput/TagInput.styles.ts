import { Dimensions, StyleSheet, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'

const { height, width } = Dimensions.get('window')

const styles = {
  textInputStyle: {
    width: '95%',
    alignSelf: 'center',
    height: 35,
    padding: 0,
    borderBottomWidth: 1,
    borderColor: colors[Colors.tertiary9],
  } as ViewStyle,
  container: {
    margin: 10,
    borderRadius: 10,
    justifyContent: 'flex-start',
  } as ViewStyle,
  input: {
    backgroundColor: colors[Colors.white],
    borderBottomWidth: 1,
    borderColor: colors[Colors.tertiary9],
  } as ViewStyle,
}

export default StyleSheet.create(styles)
