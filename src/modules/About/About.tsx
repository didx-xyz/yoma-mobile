import api from 'api'
import { InfoModal, NormalHeader, ViewContainer } from 'components'
import { USER_ID } from 'helpers/helpers'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { TextStyles } from 'styles'

import styles from './About.styles'

interface Props {
  navigation: any
}

const About = ({ navigation }: Props) => {
  const { t } = useTranslation()
  const [summary, setSummary] = useState('')
  const [infoModal, setInfoModal] = useState(false)

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
      <InfoModal
        visible={infoModal}
        closeModal={() => setInfoModal(false)}
        infoText={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis mauris purus. Quisque malesuada ornare mauris sed feugiat. Cras lectus est, iaculis quis nulla cursus, finibus gravida massa. Donec condimentum porta nisi, eu egestas risus ullamcorper in. In et magna mauris. '
        }
      />
      <NormalHeader navigation={navigation} headerText={t('About')} onSave={updateBiography} />
      <View style={styles.whiteCard}>
        <Text style={[TextStyles.textTertiary5, TextStyles.semiBoldText, { alignSelf: 'flex-start' }]}>
          {t('Summary')}
        </Text>
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
        <TouchableOpacity onPress={() => setInfoModal(true)}>
          <Text style={[TextStyles.semiBoldText, TextStyles.textTertiary3, { marginVertical: 10 }]}>
            {t('Find inspiration on how to write a great profile.')}
          </Text>
        </TouchableOpacity>
      </View>
    </ViewContainer>
  )
}

export default About
