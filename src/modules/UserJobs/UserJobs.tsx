import { StackNavigationProp } from '@react-navigation/stack'
import { Card, EmptyCard, InfoCard, Optional } from 'components'
import NormalHeader from 'components/NormalHeader/NormalHeader'
import ViewContainer from 'components/ViewContainer/ViewContainer'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from 'modules/HomeNavigation/HomeNavigation.types'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, ScrollView } from 'react-native'

import styles from './UserJobs.styles'
import * as UserJobsTypes from './UserJobs.types'
import { extractUserJobsFormValues } from './UserJobs.utils'
import UserJobsForm from './UserJobsForm/UserJobsForm'
import { INITIAL_VALUES } from './UserJobsForm/UserJobsForm.constants'

interface Props {
  userJobs: UserJobsTypes.UserJobItem[]
  organisations: []
  skills: []
  onJobCreate: (job: any) => void
  onJobPatch: (job: any) => void
  filterSkillsByValue: (query: string) => void
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.UserJobs>
}

const UserJobs = ({
  userJobs,
  organisations,
  skills,
  onJobCreate,
  onJobPatch,
  filterSkillsByValue,
  navigation,
}: Props) => {
  const { t } = useTranslation()
  const [isSaved, setIsSaved] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [formState, setFormState] = useState<UserJobsTypes.UserJobsFormState>({ isValid: true, values: INITIAL_VALUES })

  const addUserJob = useCallback(() => {
    setIsSaved(true)
    setIsEditMode(false)
  }, [])

  const editUserJob = (item: any) => {
    const values = extractUserJobsFormValues(item)
    setFormState({ ...formState, values })
    setIsSaved(true)
    setIsEditMode(true)
  }
  const handleUserJobsFormSave = () => {
    if (!isEditMode) {
      onJobCreate(formState.values)
    } else {
      onJobPatch(formState.values)
    }
  }

  const renderItem = (item: UserJobsTypes.UserJobItem) => {
    const { job, startDate, endDate } = item
    return (
      <InfoCard
        title={job.title}
        description={job.description}
        startDate={startDate}
        endDate={endDate}
        logo={job.organisationLogoURL}
        onEdit={() => editUserJob(item)}
      />
    )
  }

  return (
    <ViewContainer style={styles.container}>
      <NormalHeader
        navigation={navigation}
        headerText={t('UserJobs')}
        onSave={handleUserJobsFormSave}
        onAdd={addUserJob}
        showAddButton={!isSaved}
        isSaveButtonEnabled={formState?.isValid}
      />
      <Optional
        condition={isSaved}
        fallback={
          <Optional
            condition={userJobs.length > 0}
            fallback={<EmptyCard title={t('Where do you currently work?')} onAdd={() => setIsSaved(true)} />}
          >
            <FlatList
              data={userJobs}
              contentContainerStyle={styles.listContainer}
              renderItem={({ item }: any) => renderItem(item)}
              keyExtractor={(item: any) => item.job.id}
            />
          </Optional>
        }
      >
        <ScrollView>
          <Card>
            <UserJobsForm
              formValues={formState?.values}
              filterSkillsByValue={filterSkillsByValue}
              setFormState={setFormState}
              skills={skills}
              organisations={organisations}
            />
          </Card>
        </ScrollView>
      </Optional>
    </ViewContainer>
  )
}

export default UserJobs
