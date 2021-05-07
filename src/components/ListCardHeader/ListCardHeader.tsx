import Text, { HeaderLevels } from 'components/Typography'
import React from 'react'
import { View } from 'react-native'
import { Colors } from 'styles'

import CountBadge from '../CountBadge'
import styles from './ListCardHeader.styles'

type Props = {
  count: number
  color: Colors
  header: string
}

const ListCardHeader = ({ count, color, header }: Props) => {
  return (
    <View style={styles.container}>
      <CountBadge count={count} color={color} />
      <Text.Header level={HeaderLevels.h5} color={Colors.primaryPurple} style={styles.header}>
        {header}
      </Text.Header>
    </View>
  )
}

export default ListCardHeader
