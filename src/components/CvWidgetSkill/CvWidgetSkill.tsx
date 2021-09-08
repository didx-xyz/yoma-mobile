import Text, { HeaderLevels } from 'components/Typography'
import React from 'react'
import { View } from 'react-native'

import { Colors } from '../../styles'
import styles from './CvWidgetSkill.styles'

interface Props {
  skillName: string
}

const CvWidgetSkill = ({ skillName }: Props) => (
  <View style={styles.container}>
    <Text.Header level={HeaderLevels.H6} color={Colors.DarkGrey02}>
      {skillName}
    </Text.Header>
  </View>
)

export default CvWidgetSkill
