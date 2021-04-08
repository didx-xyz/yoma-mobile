import { StyleSheet, ViewStyle } from 'react-native'

const styles = StyleSheet.create({
  checkBoxView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
  },
  tag: {
    backgroundColor: '#72C8ED15',
    borderRadius: 10,
    padding: 10,
    margin: 2,
  } as ViewStyle,
  textTag: {
    color: '#4CADE9',
  },
})

export default styles
