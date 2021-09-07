import Text, { HeaderLevels } from 'components/Typography'
import { Optional } from 'components/index'
import React, { ReactNode } from 'react'
import { View } from 'react-native'
import { Colors } from 'styles'

import CountBadge from '../../CountBadge'
import { CV_WIDGET_COUNT_FALLBACK } from '../CvWidget.constants'
import styles from './CredentialWidgetHeader.styles'

type Props = {
  count?: number
  color: Colors
  header: string
  hasBorder?: boolean
  hasCountBadge?: boolean
  actionItem?: ReactNode
}

const CredentialWidgetHeader = ({
  count = CV_WIDGET_COUNT_FALLBACK,
  color,
  header,
  actionItem,
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
      <View style={styles.actionItem}>
        <Optional condition={!!actionItem}>{actionItem}</Optional>
      </View>
    </View>
  )
}

export default CredentialWidgetHeader
