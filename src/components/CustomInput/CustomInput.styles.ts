import { Dimensions, StyleSheet, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'

const { height, width } = Dimensions.get('window')

const styles = {
  label: {
    color: colors[Colors.tertiary9],
    marginLeft: 10,
  },
  textInputStyle: {
    width: '95%',
    alignSelf: 'center',
    height: 35,
    padding: 0,
    borderBottomWidth: 1,
    borderColor: colors[Colors.tertiary9],
  } as ViewStyle,
}

export default StyleSheet.create(styles)
