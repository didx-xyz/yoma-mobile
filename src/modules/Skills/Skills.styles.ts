import { StyleSheet, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'
import { applyAlphaToHex } from 'styles/styles.utils'

const styles = {
  container: {
    backgroundColor: colors[Colors.backgroundGrey],
    ...StyleSheet.absoluteFillObject,
  } as ViewStyle,
  whiteCard: {
    backgroundColor: colors[Colors.white],
    width: '95%',
    borderRadius: 12,
    paddingVertical: 20,
    elevation: 3,
    marginVertical: 10,
    alignSelf: 'center',
    paddingHorizontal: 10,
  } as ViewStyle,
  certificateCountView: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 15,
    marginRight: 10,
    backgroundColor: applyAlphaToHex(colors[Colors.primaryBlue])(0.15),
  } as ViewStyle,
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  } as ViewStyle,
  bodyItemView: {
    paddingVertical: 15,
    padding: 5,
    borderTopWidth: 1,
    borderColor: colors[Colors.grey4],
  } as ViewStyle,
}

export default StyleSheet.create(styles)
