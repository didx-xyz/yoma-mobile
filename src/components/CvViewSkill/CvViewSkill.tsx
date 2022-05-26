import React from 'react'
import { View } from 'react-native'

import Text, { BodyLevels, HeaderLevels } from '~/components/Typography'
import { Colors } from '~/styles'

import styles from './CvViewSkill.styles'

interface Props {
  name: string
  count: number | null
}

const CvViewSkill = ({ name, count }: Props) => (
  <View style={styles.container}>
    <Text.Header level={HeaderLevels.H6} color={Colors.DarkGrey02}>
      {name}
    </Text.Header>
    {count ?? (
      <Text.Body level={BodyLevels.Small} color={Colors.MenuGrey}>
        {' '}
        • {count}
      </Text.Body>
    )}
  </View>
)

export default CvViewSkill
