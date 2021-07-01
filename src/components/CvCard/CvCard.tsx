import { EditIcon } from 'assets/images'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'

import ListCardHeader from '../ListCardHeader'
import Text, { TextAlign } from '../Typography'
import styles from './CvCard.styles'

type Props = {
  cardTitle: string
  defaultText: string
  count?: number
  hasCountBadge?: boolean
  badgeColor?: Colors
  onEdit: () => void
}

const CvCard = ({
  cardTitle,
  defaultText,
  count = 0,
  hasCountBadge = true,
  badgeColor = Colors.white,
  onEdit,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.listCard}>
        <ListCardHeader color={badgeColor} count={count} header={cardTitle} hasCountBadge={hasCountBadge} />
        <TouchableOpacity style={styles.editIcon} onPress={onEdit}>
          <EditIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.dividerLine} />
      <View style={styles.bodyView}>
        <Text.Body align={TextAlign.center}>{defaultText}</Text.Body>
      </View>
    </View>
  )
}

export default CvCard
