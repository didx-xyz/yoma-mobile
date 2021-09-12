import Text, { HeaderLevels } from 'components/Typography'
import React from 'react'
import { View } from 'react-native'

import { Colors } from '../../styles'
import styles from './CvViewSkill.styles'

interface Props {
  name: string
}

const CvViewSkill = ({ name }: Props) => (
  <View style={styles.container}>
    <Text.Header level={HeaderLevels.H6} color={Colors.PrimaryDarkGrey}>
      {name}
    </Text.Header>
  </View>
)

export default CvViewSkill
