import { Optional } from 'components'
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
  hasCountBadge?: boolean
}

const ListCardHeader = ({ count, color, hasCountBadge = true, header }: Props) => {
  return (
    <View style={styles.container}>
      <Optional condition={hasCountBadge}>
        <CountBadge count={count} color={color} />
      </Optional>
      <Text.Header level={HeaderLevels.h5} color={Colors.primaryPurple} style={styles.header}>
        {header}
      </Text.Header>
    </View>
  )
}

export default ListCardHeader
