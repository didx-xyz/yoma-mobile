import { StackNavigationProp } from '@react-navigation/stack'
import { Card, EmptyCard, NormalHeader, Optional, ViewContainer } from 'components'
import { FormikProps, FormikValues } from 'formik'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from 'modules/HomeNavigation/HomeNavigation.types'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, ScrollView } from 'react-native'

import CredentialCard from '../../components/CredentialCard'
import { MOCKED_CHALLENGES } from './CompletedChallenges.constants'
import CompletedChallengesForm from './CompletedChallenges.form'
import styles from './CompletedChallenges.styles'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.UserChallenges>
  challenges: Omit<React.ComponentProps<typeof CredentialCard>, 'onEdit'>[]
}

const CompletedChallenges = ({ navigation, challenges = MOCKED_CHALLENGES }: Props) => {
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
            condition={challenges.length > 0}
            fallback={
              <EmptyCard title={t('Have you completed any challenges yet?')} onAdd={() => setIsEditing(true)} />
            }
          >
            <FlatList
              data={challenges}
              contentContainerStyle={styles.listContainer}
              renderItem={({ item }) => (
                <CredentialCard
                  {...item}
                  onEdit={() => {
                    console.log('edit me')
                  }}
                />
              )}
              keyExtractor={item => item.title}
            />
          </Optional>
        }
      >
        <ScrollView>
          <Card>
            <CompletedChallengesForm ref={formRef} />
          </Card>
        </ScrollView>
      </Optional>
    </ViewContainer>
  )
}

export default CompletedChallenges
