import { StackNavigationProp } from '@react-navigation/stack'
import { Card, EmptyCard, InfoCard, Optional } from 'components'
import NormalHeader from 'components/NormalHeader/NormalHeader'
import ViewContainer from 'components/ViewContainer/ViewContainer'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from 'modules/HomeNavigation/HomeNavigation.types'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, ScrollView } from 'react-native'

import styles from './Experience.styles'
import { ExperienceFormState, ExperienceType } from './Experience.types'
import { extractExperienceFormValues } from './Experience.utils'
import ExperienceForm from './ExperienceForm/ExperienceForm'
import { INITIAL_VALUES } from './ExperienceForm/ExperienceForm.constants'
import { DropDownList } from './ExperienceForm/ExperienceForm.types'

interface Props {
  onJobCreate: (job: any) => void
  filterSkillsByName: (query: string) => void
  jobs: []
  organisations: DropDownList[]
  skills: DropDownList[]
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.Experience>
}

const Experience = ({ navigation, onJobCreate, filterSkillsByName, jobs, organisations, skills }: Props) => {
  const { t } = useTranslation()
  const [isSaved, setIsSaved] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [jobsList, setJobsList] = useState([])
  const [formState, setFormState] = useState<ExperienceFormState>({ isValid: true, values: INITIAL_VALUES })

  useEffect(() => {
    setJobsList(Object.values(jobs))
  }, [jobs])

  const addJob = () => {
    setIsSaved(true)
    setIsEditMode(false)
  }
  const editJob = (item: any) => {
    const values = extractExperienceFormValues(item)
    setFormState({ ...formState, values })
    setIsSaved(true)
    setIsEditMode(true)
  }
  const handleExperienceFormSave = () => {
    if (!isEditMode) {
      onJobCreate(formState.values)
    }
  }

  const renderItem = (item: any) => {
    const { job, startDate, endDate }: ExperienceType = item
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
        headerText={t('Experience')}
        onSave={handleExperienceFormSave}
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
            <ExperienceForm
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

export default Experience
