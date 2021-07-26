import { Optional } from 'components'
import Text, { HeaderLevels } from 'components/Typography'
import React, { ReactNode } from 'react'
import { View } from 'react-native'
import { Colors } from 'styles'

import CountBadge from '../CountBadge'
import styles from './ListCardHeader.styles'

type Props = {
  count: number
  color: Colors
  header: string
  hasBorder?: boolean
  hasCountBadge?: boolean
  rightAccessory?: ReactNode
}

const ListCardHeader = ({ count, color, header, rightAccessory, hasBorder = false, hasCountBadge = true }: Props) => {
  const borderStyles = hasBorder ? styles.border : {}
  return (
    <View style={[styles.container, borderStyles]}>
      <Optional condition={hasCountBadge}>
        <CountBadge count={count} color={color} />
      </Optional>
      <Text.Header level={HeaderLevels.h5} color={Colors.primaryPurple} style={styles.header}>
        {header}
      </Text.Header>
      <View style={styles.rightAccessory}>
        <Optional condition={!!rightAccessory}>{rightAccessory}</Optional>
      </View>
    </View>
  )
}

export default ListCardHeader
