import React from 'react'
import { View } from 'react-native'

import { Colors } from '../../styles'
import { WithChildren } from '../../types/react.types'
import { isNotNil } from '../../utils/ramda.utils'
import EditButton from '../EditButton/EditButton'
import ListCardHeader from '../ListCardHeader'
import Optional from '../Optional'
import Text, { TextAlign } from '../Typography'
import styles from './CvCard.styles'
import { shouldShowContent } from './CvCard.utils'

type Props = WithChildren<{
  title: string
  fallback: string
  count?: number
  badgeColor?: Colors
  onEdit: () => void
}>
const CvCard = ({ title, fallback, count, badgeColor = Colors.White, onEdit, children }: Props) => (
  <View style={styles.container}>
    <ListCardHeader
      color={badgeColor}
      count={count}
      header={title}
      hasCountBadge={isNotNil(count) as boolean}
      rightComponent={<EditButton onPress={onEdit} />}
      hasBorder
    />
    <View style={styles.content}>
      <Optional
        condition={shouldShowContent(count, children)}
        fallback={<Text.Body align={TextAlign.center}>{fallback}</Text.Body>}
      >
        {children}
      </Optional>
    </View>
  </View>
)

export default CvCard
