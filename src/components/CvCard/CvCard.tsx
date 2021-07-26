import React from 'react'
import { View } from 'react-native'

import { Colors } from '../../styles'
import { WithChildren } from '../../types/react.types'
import ListCardHeader from '../ListCardHeader'
import Optional from '../Optional'
import Text, { TextAlign } from '../Typography'
import styles from './CvCard.styles'
import EditButton from './EditButton'

type Props = WithChildren<{
  title: string
  fallback: string
  count?: number
  badgeColor?: Colors
  onEdit: () => void
}>
const CvCard = ({ title, fallback, count, badgeColor = Colors.white, onEdit, children }: Props) => (
  <View style={styles.container}>
    <ListCardHeader
      color={badgeColor}
      count={count || 0}
      header={title}
      hasCountBadge={!!count}
      rightAccessory={<EditButton onPress={onEdit} />}
      hasBorder
    />
    <Optional condition={!!children} fallback={<Text.Body align={TextAlign.center}>{fallback}</Text.Body>}>
      {children}
    </Optional>
  </View>
)

export default CvCard
