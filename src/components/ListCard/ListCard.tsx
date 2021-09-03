import Text, { HeaderLevels } from 'components/Typography'
import React from 'react'
import { View } from 'react-native'
import { Colors } from 'styles'

import CountBadge from '../CountBadge'
import styles from './ListCard.styles'

type Props = {
  value: number
  color: Colors
  label: string
}

const ListCard = ({ value, color, label }: Props) => {
  return (
    <View style={styles.cardHeader}>
      <CountBadge value={value} color={color} />
      <Text.Header level={HeaderLevels.H5} color={Colors.PrimaryPurple} style={styles.label}>
        {label}
      </Text.Header>
    </View>
  )
}

export default ListCard
