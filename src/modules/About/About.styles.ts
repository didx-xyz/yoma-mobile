import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { Colors, colors } from '../../styles'

const styles = {
  container: {
    backgroundColor: colors[Colors.tertiary8],
    ...StyleSheet.absoluteFillObject,
  } as ViewStyle,
  whiteCard: {
    backgroundColor: colors[Colors.white],
    width: '95%',
    borderRadius: 12,
    paddingVertical: 5,
    elevation: 3,
    marginVertical: 10,
    alignSelf: 'center',
    paddingHorizontal: 15,
    flex: 1
  } as ViewStyle,
  textInputStyle: {
    borderBottomWidth: 1,
    width: '100%',
    flex: 1,
    borderColor: colors[Colors.tertiary9],
    paddingLeft: 0,
    textAlignVertical: 'top'
  } as ViewStyle,
}

export default StyleSheet.create(styles)
