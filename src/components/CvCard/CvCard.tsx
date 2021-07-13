import { EditIcon } from 'assets/images'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'

import ListCardHeader from '../ListCardHeader'
import Text, { TextAlign } from '../Typography'
import styles from './CvCard.styles'

type Props = {
  content?: string | []
  cardTitle: string
  defaultText: string
  count?: number
  hasCountBadge?: boolean
  badgeColor?: Colors
  onEdit: () => void
}

const renderTextContent = (content: string, defaultText: string) => (
  <Text.Body align={TextAlign.center}>{content || defaultText}</Text.Body>
)
const renderListContent = (content: [], defaultText: string) =>
  content.map(item => renderTextContent(item, defaultText))

const renderContent = (content: string | [], defaultText: string) => {
  if (Array.isArray(content)) {
    return renderListContent(content, defaultText)
  } else {
    return renderTextContent(content, defaultText)
  }
}

const CvCard = ({
  content = '',
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
      <View style={styles.bodyView}>{renderContent(content, defaultText)}</View>
    </View>
  )
}

export default CvCard
