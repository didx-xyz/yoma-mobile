import { StyleSheet, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'

import { OVERALL_SPACING, VERTICAL_SPACING } from './SkillCard.constants'

const styles = {
  container: {
    paddingVertical: VERTICAL_SPACING,
    padding: OVERALL_SPACING,
    borderTopWidth: 1,
    borderColor: colors[Colors.lightGrey],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as ViewStyle,
}

export default StyleSheet.create(styles)
