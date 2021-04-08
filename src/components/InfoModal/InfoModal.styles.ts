import { StyleSheet, ViewStyle, Dimensions, ImageStyle, TextStyle } from 'react-native'

import { colors, Colors } from '../../styles'

const { width, height } = Dimensions.get('window')

const styles = {
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  } as ViewStyle,
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 5
  } as ViewStyle,
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: colors[Colors.tertiary2]
  } as ViewStyle,
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  } as TextStyle,
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  } as TextStyle
}

export default StyleSheet.create(styles)
