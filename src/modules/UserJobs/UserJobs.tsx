import { StackNavigationProp } from '@react-navigation/stack'
import { Card, EmptyCard, InfoCard, Optional } from 'components'
import NormalHeader from 'components/NormalHeader/NormalHeader'
import ViewContainer from 'components/ViewContainer/ViewContainer'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from 'modules/HomeNavigation/HomeNavigation.types'
import { evolve } from 'ramda'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, ScrollView } from 'react-native'

import * as GeneralTypes from '../../types/general.types'
import { dateToISOString } from '../../utils/dates.utils'
import styles from './UserJobs.styles'
import * as UserJobsTypes from './UserJobs.types'
import { extractUserJobsFormValues } from './UserJobs.utils'
import UserJobsForm from './UserJobsForm/UserJobsForm'
import { INITIAL_VALUES } from './UserJobsForm/UserJobsForm.constants'

interface Props {
  userJobs: UserJobsTypes.UserJobItem[]
  organisations: GeneralTypes.DropDownList[]
  skills: GeneralTypes.DropDownList[]
  onJobCreate: (job: any) => void
  onJobPatch: (job: any) => void
  onFilterSkills: (query: string) => void
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.UserJobs>
}

const UserJobs = ({ userJobs, organisations, skills, onJobCreate, onJobPatch, onFilterSkills, navigation }: Props) => {
  const { t } = useTranslation()
  const [isSaved, setIsSaved] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [formState, setFormState] = useState<UserJobsTypes.UserJobsFormState>({ isValid: true, values: INITIAL_VALUES })

  const handleAddUserJob = useCallback(() => {
    setIsSaved(true)
    setIsEditMode(false)
  }, [])

  const handleEditUserJob = useCallback(
    (item: any) => {
      const values = extractUserJobsFormValues(item)
      setFormState({ ...formState, values })
      setIsSaved(true)
      setIsEditMode(true)
    },
    [formState],
  )

  const handleUserJobsFormSave = () => {
    if (!isEditMode) {
      const values = evolve({
        startTime: dateToISOString,
        endTime: dateToISOString,
      })(formState.values)
      onJobCreate(values)
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
        onEdit={() => handleEditUserJob(item)}
      />
    )
  }

  return (
    <ViewContainer style={styles.container}>
      <NormalHeader
        navigation={navigation}
        headerText={t('Experience')}
        onSave={handleUserJobsFormSave}
        onAdd={handleAddUserJob}
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
              onFilterSkills={onFilterSkills}
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
