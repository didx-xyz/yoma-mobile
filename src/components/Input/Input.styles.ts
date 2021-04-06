import { Dimensions, StyleSheet, ViewStyle } from 'react-native'

const { height, width } = Dimensions.get('window')

const styles = {
  textInputStyle: {
    backgroundColor: 'rgb(243,246,250)',
    width: width / 1.3,
    alignSelf: 'center',
    borderRadius: 60,
    marginTop: 10,
    paddingLeft: 20,
    height: 45,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
