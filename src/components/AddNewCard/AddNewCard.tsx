import { PurpleTopRightCircle, YellowBottomLeftCircle } from 'assets/images'
import Button, { ButtonSizes } from 'components/Button'
import Text, { TextAlign } from 'components/Typography'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { Colors } from 'styles'

import styles from './AddNewCard.styles'

type Props = {
  title: string
  onAdd: () => void
}

const AddNewCard = ({ title, onAdd }: Props) => {
  const { t } = useTranslation()
  return (
    <View style={styles.container}>
      <View style={styles.yellowCircle}>
        <YellowBottomLeftCircle />
      </View>
      <Text.Body style={styles.text} color={Colors.primaryDarkGrey} align={TextAlign.center}>
        {title}
      </Text.Body>
      <Button size={ButtonSizes.Slim} label={t('Add')} onPress={onAdd} style={styles.button} />
      <View style={styles.purpleCircle}>
        <PurpleTopRightCircle />
      </View>
    </View>
  )
}

export default AddNewCard
