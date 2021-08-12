import { StackNavigationProp } from '@react-navigation/stack'
import { EmptyCard, Card, InfoCard, NormalHeader, Optional, ViewContainer } from 'components'
import { FormikProps, FormikValues } from 'formik'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from 'modules/HomeNavigation/HomeNavigation.types'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, ScrollView } from 'react-native'

import { MOCKED_CHALLENGES } from './UserChallenges.constants'
import UserChallengesForm from './UserChallenges.form'
import styles from './UserChallenges.styles'
import { ChallengeEntry } from './UserChallenges.types'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.UserChallenges>
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

const UserChallenges = ({ navigation }: Props) => {
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
            <UserChallengesForm ref={formRef} />
          </Card>
        </ScrollView>
      </Optional>
    </ViewContainer>
  )
}

export default UserChallenges
