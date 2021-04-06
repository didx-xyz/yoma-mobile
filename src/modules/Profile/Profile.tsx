import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Text, View } from 'react-native'

import ViewContainer from '../../components/ViewContainer/ViewContainer'
import styles from './Profile.styles'

interface Props {
  navigation: any
}

const Profile = ({ navigation }: Props) => {
  const { t } = useTranslation()
  return (
    <ViewContainer style={styles.container}>
      <Text style={styles.text}>{t('Profile')}</Text>
    </ViewContainer>
  )
}

export default Profile
