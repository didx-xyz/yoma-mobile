import { Dimensions, StyleSheet, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'

const { width } = Dimensions.get('window')

const styles = {
  textInputStyle: {
    backgroundColor: colors[Colors.grey4],
    width: width / 1.3,
    alignSelf: 'center',
    borderRadius: 60,
    marginTop: 10,
    paddingLeft: 20,
    height: 45,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
