import { Dimensions, StyleSheet, ViewStyle } from 'react-native'
const { width, height } = Dimensions.get('window');

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  } as ViewStyle,
}

export default StyleSheet.create(styles)
