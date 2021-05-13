import { StackNavigationProp } from '@react-navigation/stack'
import { Card, InfoCard, NormalHeader, Optional, ViewContainer } from 'components'
import Spacer from 'components/Spacer'
import { FormikProps, FormikValues } from 'formik'
import { NavigationRoutes } from 'modules/Home/Home.routes'
import { HomeNavigatorParamsList } from 'modules/Home/Home.types'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, ScrollView } from 'react-native'
import { CARD_SPACER } from 'styles/styles.constants'

import { MOCKED_CHALLENGES } from './MyChallenges.constants'
import styles from './MyChallenges.styles'
import { ChallengeEntry } from './MyChallenges.types'
import NewChallengeForm from './NewChallengeForm/NewChallengeForm'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, NavigationRoutes.MyChallenges>
}

const renderChallengeEntry = ({ challenge, description, startDate, endDate, organisationLogoUrl }: ChallengeEntry) => {
  return (
    <InfoCard
      title={challenge}
      description={description}
      startDate={startDate}
      endDate={endDate}
      logo={organisationLogoUrl}
    />
  )
}

const MyChallenges = ({ navigation }: Props) => {
  const { t } = useTranslation()
  const [isEditing, setIsEditing] = useState(false)
  const [challenges, setChallenges] = useState(MOCKED_CHALLENGES)
  const formRef = useRef<FormikProps<FormikValues>>()

  return (
    <ViewContainer style={styles.container}>
      <NormalHeader
        navigation={navigation}
        onSave={formRef.current?.handleSubmit}
        headerText={
          <Optional condition={isEditing} fallback={t('Challenges')}>
            {t('Add challenge')}
          </Optional>
        }
        onAdd={() => setIsEditing(true)}
        showAddButton={!isEditing}
      />
      <Optional
        condition={isEditing}
        fallback={
          <FlatList
            data={challenges}
            ListHeaderComponent={<Spacer height={CARD_SPACER} />}
            renderItem={({ item }) => renderChallengeEntry(item)}
            keyExtractor={item => item.challenge}
          />
        }
      >
        <ScrollView>
          <Card>
            <NewChallengeForm navigation={navigation} ref={formRef} />
          </Card>
        </ScrollView>
      </Optional>
    </ViewContainer>
  )
}

export default MyChallenges
