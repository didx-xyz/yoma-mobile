import Text, { HeaderLevels } from 'components/Typography'
import { Optional } from 'components/index'
import React, { ReactNode } from 'react'
import { View } from 'react-native'
import { Colors } from 'styles'

import CountBadge from '../../CountBadge'
import { COUNT_FALLBACK } from '../CvCard.constants'
import styles from './CvCardHeader.styles'

type Props = {
  count?: number
  color: Colors
  header: string
  hasBorder?: boolean
  hasCountBadge?: boolean
  rightComponent?: ReactNode
}

const CvCardHeader = ({
  count = COUNT_FALLBACK,
  color,
  header,
  rightComponent,
  hasBorder = false,
  hasCountBadge = true,
}: Props) => {
  const borderStyles = hasBorder ? styles.border : {}
  return (
    <View style={[styles.container, borderStyles]}>
      <Optional condition={hasCountBadge}>
        <CountBadge count={count} color={color} />
      </Optional>
      <Text.Header level={HeaderLevels.H5} color={Colors.PrimaryPurple} style={styles.header}>
        {header}
      </Text.Header>
      <View style={styles.rightAccessory}>
        <Optional condition={!!rightComponent}>{rightComponent}</Optional>
      </View>
    </View>
  )
}

export default CvCardHeader
