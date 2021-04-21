import { EditIcon } from 'assets/images'
import { Optional } from 'components'
import Text, { HeaderLevels, TextAlign } from 'components/Typography'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'

import styles from './CvCard.styles'

type Props = {
  cardTitle: string
  defaultText: string
  count?: number
  hasCount: boolean
  countColor?: Colors
  countBackgroundColor?: Colors
  onEdit?: () => void
}

const CvCard = ({
  cardTitle,
  defaultText,
  count,
  hasCount = false,
  countColor,
  countBackgroundColor,
  onEdit,
}: Props) => {
  return (
    <View style={styles.cardView}>
      <View style={styles.rowView}>
        <Optional condition={hasCount}>
          <View style={[styles.certificateCountView, { backgroundColor: countBackgroundColor }]}>
            <Text.Header level={HeaderLevels.h6} color={countColor}>
              {count}
            </Text.Header>
          </View>
        </Optional>
        <Text.Header level={HeaderLevels.h5} color={Colors.primaryPurple}>
          {cardTitle}
        </Text.Header>
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
