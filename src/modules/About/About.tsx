import { StackNavigationProp } from '@react-navigation/stack'
import { Card, FormWrapper, InfoModal, NormalHeader, ViewContainer } from 'components'
import Text, { MetaLevels } from 'components/Typography'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from 'modules/HomeNavigation/HomeNavigation.types'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TextInput, View } from 'react-native'
import { Colors } from 'styles'

import styles from './About.styles'

interface Props {
  biography: string
  onBiographySave: (biography: string) => void
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.About>
}

const About = ({ navigation, onBiographySave, biography }: Props) => {
  const { t } = useTranslation()
  const [userBiography, setUserBiography] = useState(biography)
  const [infoModal, setInfoModal] = useState(false)

  return (
    <ViewContainer style={styles.container}>
      <InfoModal
        visible={infoModal}
        closeModal={() => setInfoModal(false)}
        infoText={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis mauris purus. Quisque malesuada ornare mauris sed feugiat. Cras lectus est, iaculis quis nulla cursus, finibus gravida massa. Donec condimentum porta nisi, eu egestas risus ullamcorper in. In et magna mauris. '
        }
      />
      <NormalHeader
        isSaveButtonEnabled
        navigation={navigation}
        headerText={t('About')}
        onSave={() => onBiographySave(userBiography)}
      />
      <Card style={styles.card}>
        <FormWrapper>
          <Text.Meta level={MetaLevels.small}>{t('Summary')}</Text.Meta>
          <TextInput
            style={styles.textInput}
            value={userBiography}
            multiline
            maxLength={1000}
            onChangeText={setUserBiography}
            returnKeyType="done"
          />
          <View style={styles.bottom}>
            <Text.Meta level={MetaLevels.smallBold} color={Colors.primaryGreen} onPress={() => setInfoModal(true)}>
              {t('Find inspiration on how to write a great education description.')}
            </Text.Meta>
          </View>
        </FormWrapper>
      </Card>
    </ViewContainer>
  )
}

export default About
