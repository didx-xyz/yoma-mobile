import { StyleSheet, ViewStyle } from 'react-native'

const styles = {
  container: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 20,
  } as ViewStyle,
  imageWrap: {
    position: 'relative',
    width: 36,
    marginRight: 14,
  } as ViewStyle,
  validated: {
    position: 'absolute',
    top: 0,
    right: 0,
  } as ViewStyle,
  content: {
    flex: 1,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
