import { StackNavigationProp } from '@react-navigation/stack'
import { Card, FormWrapper, InfoModal, NormalHeader, ViewContainer } from 'components'
import Text, { MetaLevels } from 'components/Typography'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from 'modules/HomeNavigation/HomeNavigation.types'
import { UserPayload } from 'modules/User/User.types'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TextInput, View } from 'react-native'
import { Colors } from 'styles'

import styles from './About.styles'

interface Props {
  biography: string
  onPatchUserData: (biography: UserPayload) => void
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.About>
}

const About = ({ navigation, onPatchUserData, biography }: Props) => {
  const { t } = useTranslation()
  const [summary, setSummary] = useState(biography)
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
        onSave={() => onPatchUserData(summary)}
      />
      <Card style={styles.card}>
        <FormWrapper>
          <Text.Meta level={MetaLevels.small}>{t('Summary')}</Text.Meta>
          <TextInput
            style={styles.textInput}
            value={summary}
            multiline
            maxLength={1000}
            onChangeText={setSummary}
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
