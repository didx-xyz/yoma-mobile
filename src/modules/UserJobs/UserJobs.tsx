import { StackNavigationProp } from '@react-navigation/stack'
import { Card, EmptyCard, InfoCard, Optional } from 'components'
import NormalHeader from 'components/NormalHeader/NormalHeader'
import ViewContainer from 'components/ViewContainer/ViewContainer'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from 'modules/HomeNavigation/HomeNavigation.types'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, ScrollView } from 'react-native'

import styles from './UserJobs.styles'
import * as UserJobsTypes from './UserJobs.types'
import { extractUserJobsFormValues } from './UserJobs.utils'
import UserJobsForm from './UserJobsForm/UserJobsForm'
import { INITIAL_VALUES, MOCKED_JOBS, MOCK_ORGANISATIONS, MOCK_SKILLS } from './UserJobsForm/UserJobsForm.constants'

interface Props {
  onJobCreate: (job: any) => void
  onJobPatch: (job: any) => void
  filterSkillsByValue: (query: string) => void
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.UserJobs>
}

const UserJobs = ({ onJobCreate, onJobPatch, filterSkillsByValue, navigation }: Props) => {
  const { t } = useTranslation()
  const [isSaved, setIsSaved] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [userJobsList, setUserJobsList] = useState<UserJobsTypes.UserJobsList[]>([])
  const [formState, setFormState] = useState<UserJobsTypes.UserJobsFormState>({ isValid: true, values: INITIAL_VALUES })

  useEffect(() => {
    setUserJobsList(MOCKED_JOBS)
  }, [])

  const addUserJob = () => {
    setIsSaved(true)
    setIsEditMode(false)
  }
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

  const renderItem = (item: any) => {
    const { job, startDate, endDate }: UserJobsTypes.UserJobsList = item
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
            condition={userJobsList.length > 0}
            fallback={<EmptyCard title={t('Where do you currently work?')} onAdd={() => setIsSaved(true)} />}
          >
            <FlatList
              data={userJobsList}
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
              skills={MOCK_SKILLS}
              organisations={MOCK_ORGANISATIONS}
            />
          </Card>
        </ScrollView>
      </Optional>
    </ViewContainer>
  )
}

export default UserJobs
