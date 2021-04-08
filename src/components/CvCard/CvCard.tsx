import { EditIcon } from 'assets/Images'
import React, { Component } from 'react'
import { useTranslation } from 'react-i18next'
import { Dimensions, GestureResponderEvent, Text, TouchableOpacity, View } from 'react-native'
import { TextProps } from 'react-native-elements'
import { colors, Colors, TextStyles } from 'styles'

import styles from './CvCard.styles'

type Props = {
  cardTitle: string
  defaultText: string
  certCount?: any
  onEdit?: () => void
}

const CvCard = ({ cardTitle, defaultText, certCount, onEdit }: Props) => {
  const { t } = useTranslation()
  return (
    <View style={styles.cardView}>
      <View style={styles.rowView}>
        {certCount}
        <Text style={[TextStyles.textPrimary, TextStyles.h3, TextStyles.semiBoldText]}>{cardTitle}</Text>
        <TouchableOpacity style={styles.editIcon} onPress={onEdit}>
          <EditIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.dividerLine} />
      <View style={styles.bodyView}>
        <Text style={[TextStyles.h4, { textAlign: 'center' }]}>{defaultText}</Text>
      </View>
    </View>
  )
}

export default CvCard
