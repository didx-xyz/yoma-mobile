import { StyleSheet, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'

const styles = {
  innerView: {
    flexDirection: 'row',
    backgroundColor: colors[Colors.lightGrey],
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 6,
    justifyContent: 'space-between',
    marginVertical: 10,
  } as ViewStyle,
  buttonView: {
    backgroundColor: colors[Colors.white],
    paddingHorizontal: 15,
    borderRadius: 25,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
