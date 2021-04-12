import { Dimensions, StyleSheet, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'

const { height } = Dimensions.get('window')

const styles = {
  cardView: {
    backgroundColor: colors[Colors.white],
    width: '97%',
    borderRadius: 25,
    alignSelf: 'center',
    overflow: 'hidden',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    height: height / 4,
  } as ViewStyle,
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  editIcon: {
    elevation: 3,
    backgroundColor: colors[Colors.white],
    borderRadius: 15,
    position: 'absolute',
    right: 0,
  } as ViewStyle,
  dividerLine: {
    height: 2,
    backgroundColor: colors[Colors.tertiary10],
    marginVertical: 10,
  } as ViewStyle,
  bodyView: {
    height: '70%',
    justifyContent: 'center',
  } as ViewStyle,
}

export default StyleSheet.create(styles)
