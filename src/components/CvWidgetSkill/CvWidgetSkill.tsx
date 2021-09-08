import Text, { HeaderLevels } from 'components/Typography'
import React from 'react'
import { View } from 'react-native'

import { Colors } from '../../styles'
import styles from './CvWidgetSkill.styles'

interface Props {
  name: string
}

const CvWidgetSkill = ({ name }: Props) => (
  <View style={styles.container}>
    <Text.Header level={HeaderLevels.H6} color={Colors.DarkGrey02}>
      {name}
    </Text.Header>
  </View>
)

export default CvWidgetSkill
