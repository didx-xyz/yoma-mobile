import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { Colors, colors } from '~/styles'

const styles = {
  container: {
    backgroundColor: colors[Colors.White],
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  bgContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: colors[Colors.PrimaryPurple],
    height: 220,
    overflow: 'hidden',
  } as ViewStyle,
  bgCircle: {
    position: 'absolute',
    top: 30,
    right: -160,
  } as ImageStyle,
  hero: {
    backgroundColor: colors[Colors.PrimaryYellow],
    position: 'absolute',
    left: 10,
    right: 10,
    top: 120,
    borderRadius: 25,
    padding: 20,
    overflow: 'hidden',
  } as ViewStyle,
  bottomCircle: {
    position: 'absolute',
    bottom: -80,
    left: -65,
  } as ImageStyle,
  bottomSplatter: {
    position: 'absolute',
    bottom: -19,
    left: 16,
  } as ImageStyle,
  content: {
    paddingBottom: 120,
  } as ViewStyle,
  header: {
    marginBottom: 10,
  } as ViewStyle,
  text: {
    fontSize: 36,
    fontWeight: 'bold',
  } as TextStyle,
}

export default StyleSheet.create(styles)
