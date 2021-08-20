import { StackNavigationProp } from '@react-navigation/stack'
import { Card, EmptyCard, InfoCard, Optional } from 'components'
import NormalHeader from 'components/NormalHeader/NormalHeader'
import ViewContainer from 'components/ViewContainer/ViewContainer'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from 'modules/HomeNavigation/HomeNavigation.types'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, ScrollView } from 'react-native'

import styles from './UserJobs.styles'
import { UserJobsFormState, UserJobsType } from './UserJobs.types'
import { extractUserJobsFormValues } from './UserJobs.utils'
import UserJobsForm from './UserJobsForm/UserJobsForm'
import { INITIAL_VALUES } from './UserJobsForm/UserJobsForm.constants'
import { DropDownList } from './UserJobsForm/UserJobsForm.types'

interface Props {
  onJobCreate: (job: any) => void
  filterSkillsByName: (query: string) => void
  jobs: []
  organisations: DropDownList[]
  skills: DropDownList[]
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.UserJobs>
}

const UserJobs = ({ navigation, onJobCreate, filterSkillsByName, jobs, organisations, skills }: Props) => {
  const { t } = useTranslation()
  const [isSaved, setIsSaved] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [jobsList, setJobsList] = useState([])
  const [formState, setFormState] = useState<UserJobsFormState>({ isValid: true, values: INITIAL_VALUES })

  useEffect(() => {
    setJobsList(Object.values(jobs))
  }, [jobs])

  const addJob = () => {
    setIsSaved(true)
    setIsEditMode(false)
  }
  const editJob = (item: any) => {
    const values = extractUserJobsFormValues(item)
    setFormState({ ...formState, values })
    setIsSaved(true)
    setIsEditMode(true)
  }
  const handleUserJobsFormSave = () => {
    if (!isEditMode) {
      onJobCreate(formState.values)
    }
  }

  const renderItem = (item: any) => {
    const { job, startDate, endDate }: UserJobsType = item
    return (
      <InfoCard
        title={job.title}
        description={job.description}
        startDate={startDate}
        endDate={endDate}
        logo={job.organisationLogoURL}
        onEdit={() => editJob(item)}
      />
    )
  }

  return (
    <ViewContainer style={styles.container}>
      <NormalHeader
        navigation={navigation}
        headerText={t('UserJobs')}
        onSave={handleUserJobsFormSave}
        onAdd={addJob}
        showAddButton={!isSaved}
        isSaveButtonEnabled={formState?.isValid}
      />
      <Optional
        condition={isSaved}
        fallback={
          <Optional
            condition={jobsList.length > 0}
            fallback={<EmptyCard title={t('Where do you currently work?')} onAdd={() => setIsSaved(true)} />}
          >
            <FlatList
              data={jobsList}
              contentContainerStyle={styles.listContainer}
              renderItem={({ item }: any) => renderItem(item)}
              keyExtractor={(item: any, index: number) => index.toString()}
            />
          </Optional>
        }
      >
        <ScrollView>
          <Card>
            <UserJobsForm
              formValues={formState?.values}
              filterSkillsByName={filterSkillsByName}
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
