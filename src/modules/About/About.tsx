import { StackNavigationProp } from '@react-navigation/stack'
import api from 'api'
import { InfoModal, NormalHeader, ViewContainer } from 'components'
import Text, { MetaLevels } from 'components/Typography'
import { USER_ID } from 'helpers/helpers'
import { HomeNavigationRoutes } from 'modules/Home/Home.routes'
import { HomeNavigatorParamsList } from 'modules/Home/Home.types'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity, View, TextInput } from 'react-native'
import { Colors } from 'styles'

import styles from './About.styles'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.About>
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
      navigation.navigate(HomeNavigationRoutes.Home)
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
        <Text.Meta level={MetaLevels.small}>{t('Summary')}</Text.Meta>
        <TextInput
          style={styles.textInput}
          value={summary}
          multiline
          maxLength={1000}
          onChangeText={text => {
            setSummary(text)
          }}
          returnKeyType="done"
        />
        <TouchableOpacity onPress={() => setInfoModal(true)}>
          <Text.Meta level={MetaLevels.smallBold} color={Colors.primaryGreen} style={styles.bottomText}>
            {t('Find inspiration on how to write a great profile.')}
          </Text.Meta>
        </TouchableOpacity>
      </View>
    </ViewContainer>
  )
}

export default About
