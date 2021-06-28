import { StackNavigationProp } from '@react-navigation/stack'
import { Card, FormWrapper, InfoModal, NormalHeader, ViewContainer } from 'components'
import Text, { MetaLevels } from 'components/Typography'
import { HomeNavigationRoutes } from 'modules/Home/Home.routes'
import { HomeNavigatorParamsList } from 'modules/Home/Home.types'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View, TextInput } from 'react-native'
import { Colors } from 'styles'

import styles from './About.styles'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.About>
}

const About = ({ navigation }: Props) => {
  const { t } = useTranslation()
  const [summary, setSummary] = useState('')
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
      <NormalHeader navigation={navigation} headerText={t('About')} onSave={() => {}} />
      <Card style={styles.card}>
        <FormWrapper>
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
