import React from 'react'
import { View } from 'react-native'

import Optional from '~/components/Optional'
import Text, { BodyLevels, HeaderLevels } from '~/components/Typography'
import { Colors } from '~/styles'
import { isNotNil } from '~/utils/ramda.utils'

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
    <Optional condition={isNotNil(count)}>
      <Text.Body level={BodyLevels.Small} color={Colors.MenuGrey}>
        {' '}
        • {count}
      </Text.Body>
    </Optional>
  </View>
)

export default CvViewSkill
