import { StyleSheet, TextStyle } from 'react-native'

import { HeaderLevels } from './Header.types'

const styles = {
  [HeaderLevels.h1]: {} as TextStyle,
  [HeaderLevels.h2]: {} as TextStyle,
  [HeaderLevels.h3]: {} as TextStyle,
  [HeaderLevels.h4]: {} as TextStyle,
  [HeaderLevels.h5]: {} as TextStyle,
  [HeaderLevels.h6]: {} as TextStyle,
}

export default StyleSheet.create(styles)
