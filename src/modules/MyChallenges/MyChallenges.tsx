import { StackNavigationProp } from '@react-navigation/stack'
import { EmptyCard, Card, InfoCard, NormalHeader, Optional, ViewContainer } from 'components'
import { FormikProps, FormikValues } from 'formik'
import { HomeNavigationRoutes } from 'modules/HomeNavigation/HomeNavigation.routes'
import { HomeNavigatorParamsList } from 'modules/HomeNavigation/HomeNavigation.types'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, ScrollView } from 'react-native'

import { MOCKED_CHALLENGES } from './MyChallenges.constants'
import styles from './MyChallenges.styles'
import { ChallengeEntry } from './MyChallenges.types'
import NewChallengeForm from './NewChallengeForm/NewChallengeForm'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.MyChallenges>
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
          <Optional
            condition={MOCKED_CHALLENGES.length > 0}
            fallback={
              <EmptyCard title={t('Have you completed any challenges yet?')} onAdd={() => setIsEditing(true)} />
            }
          >
            <FlatList
              data={MOCKED_CHALLENGES}
              contentContainerStyle={styles.listContainer}
              renderItem={({ item }) => renderChallengeEntry(item)}
              keyExtractor={item => item.challenge}
            />
          </Optional>
        }
      >
        <ScrollView>
          <Card>
            <NewChallengeForm ref={formRef} />
          </Card>
        </ScrollView>
      </Optional>
    </ViewContainer>
  )
}

export default MyChallenges
