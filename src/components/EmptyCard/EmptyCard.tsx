import { PurpleTopRightCircle, YellowBottomLeftCircle } from 'assets/images'
import Button, { ButtonSizes } from 'components/Button'
import Text, { TextAlign } from 'components/Typography'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { Colors } from 'styles'

import Background from '../Background/Background'
import styles from './EmptyCard.styles'

type Props = {
  title: string
  onPress: () => void
}

const EmptyCard = ({ title, onPress }: Props) => {
  const { t } = useTranslation()
  return (
    <View style={styles.container}>
      <Background color={Colors.White}>
        <View style={styles.yellowCircle}>
          <YellowBottomLeftCircle />
        </View>
        <View style={styles.purpleCircle}>
          <PurpleTopRightCircle />
        </View>
      </Background>
      <Text.Body style={styles.text} color={Colors.PrimaryDarkGrey} align={TextAlign.Center}>
        {title}
      </Text.Body>
      <Button size={ButtonSizes.Slim} label={t('Add')} onPress={onPress} style={styles.button} />
    </View>
  )
}

export default EmptyCard
