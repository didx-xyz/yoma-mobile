import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Text, View } from 'react-native'

import ViewContainer from '../../components/ViewContainer/ViewContainer'
import styles from './DigitalCvHome.styles'

interface Props {
  navigation: any
}

const DigitalCvHome = ({ navigation }: Props) => {
  const { t } = useTranslation()
  return (
    <ViewContainer style={styles.container}>
      <Text style={styles.text}>{t('signUpPlease')}</Text>
    </ViewContainer>
  )
}

export default DigitalCvHome
