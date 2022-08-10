import React from 'react'

import Text, { MetaLevels } from '~/components/Typography'
import { Colors } from '~/styles'

import styles from './SpacerItem.styles'

interface Props {
  name: string
}
const SpacerItem = ({ name }: Props) => (
  <Text.Meta level={MetaLevels.Small} color={Colors.DarkGrey02} style={styles.container}>
    {name}
  </Text.Meta>
)

export default SpacerItem
