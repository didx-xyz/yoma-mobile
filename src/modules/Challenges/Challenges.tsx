import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Text, View } from 'react-native'

import ViewContainer from '../../components/ViewContainer/ViewContainer'
import styles from './Challenges.styles'

interface Props {
  navigation: any
}

const Challenges = ({ navigation }: Props) => {
  const { t } = useTranslation()
  return (
    <ViewContainer style={styles.container}>
      <Text style={styles.text}>{t('Challenges')}</Text>
    </ViewContainer>
  )
}

export default Challenges
