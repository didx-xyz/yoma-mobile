import api from 'api'
import NormalHeader from 'components/NormalHeader/NormalHeader'
import { USER_ID } from 'helpers/helpers'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { TextStyles } from 'styles'

import ViewContainer from '../../components/ViewContainer/ViewContainer'
import styles from './About.styles'

interface Props {
  navigation: any
}

const About = ({ navigation }: Props) => {
  const { t } = useTranslation()
  const [summary, setSummary] = useState('')

  useEffect(() => {
    const getBiography = async () => {
      await api.users
        .getById(USER_ID)
        .then(async response => {
          console.log('response', response)
          const user = response.data
          setSummary(user.biography || '')
        })
        .catch(error => {
          console.log('error', error)
        })
    }
    getBiography()
  }, [])

  const updateBiography = async () => {
    try {
      const response = await api.users.edit(USER_ID, { biography: summary })
      console.log('response', response)
      navigation.navigate('Home')
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <ViewContainer style={styles.container}>
      <NormalHeader navigation={navigation} headerText={t('About')} onSave={updateBiography} />
      <View style={styles.whiteCard}>
        <Text style={{ alignSelf: 'flex-start' }}>{t('Summary')}</Text>
        <TextInput
          style={styles.textInputStyle}
          value={summary}
          multiline
          maxLength={1000}
          onChangeText={text => {
            setSummary(text)
          }}
          returnKeyType="done"
        />
        <TouchableOpacity onPress={() => {}}>
          <Text style={[TextStyles.h5, TextStyles.textTertiary3, { marginVertical: 10 }]}>
            {t('Find inspiration on how to write a great profile.')}
          </Text>
        </TouchableOpacity>
      </View>
    </ViewContainer>
  )
}

export default About
