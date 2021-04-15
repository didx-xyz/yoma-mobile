import { StyleSheet, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'

const styles = {
  outerView: {
    marginHorizontal: 15,
  } as ViewStyle,
  innerView: {
    flexDirection: 'row',
    backgroundColor: colors[Colors.grey4],
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 6,
    justifyContent: 'space-between',
    marginVertical: 10,
  } as ViewStyle,
  buttonView: {
    backgroundColor: colors[Colors.white],
    paddingHorizontal: 10,
    borderRadius: 25,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
