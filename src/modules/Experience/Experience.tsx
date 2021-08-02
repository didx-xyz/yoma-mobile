import { StackNavigationProp } from '@react-navigation/stack'
import { Card, EmptyCard, InfoCard, Optional } from 'components'
import NormalHeader from 'components/NormalHeader/NormalHeader'
import ViewContainer from 'components/ViewContainer/ViewContainer'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from 'modules/HomeNavigation/HomeNavigation.types'
import { JobRequestPayload } from 'modules/Job/Job.types'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, ScrollView } from 'react-native'

import styles from './Experience.styles'
import { ExperienceFormState, ExperienceType } from './Experience.types'
import ExperienceForm from './ExperienceForm/ExperienceForm'
import { DropDownList } from './ExperienceForm/ExperienceForm.types'

interface Props {
  onJobSave: (job: JobRequestPayload) => void
  jobs: []
  organisations: DropDownList[]
  skills: DropDownList[]
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.Experience>
}

const renderItem = ({ job, startDate, endDate }: ExperienceType) => (
  <InfoCard
    title={job.title}
    description={job.description}
    startDate={startDate}
    endDate={endDate}
    logo={job.organisationLogoURL}
  />
)

const Experience = ({ navigation, onJobSave, jobs, organisations, skills }: Props) => {
  const { t } = useTranslation()
  const [isSaved, setIsSaved] = useState(false)
  const [job, setJob] = useState([])
  const [formState, setFormState] = useState<ExperienceFormState | null>(null)

  useEffect(() => {
    setJob(job)
  }, [job])

  const handleExperienceForm = () => {
    if (formState?.isValid) {
      onJobSave(formState.values as JobRequestPayload)
    }
  }
  return (
    <ViewContainer style={styles.container}>
      <NormalHeader
        navigation={navigation}
        headerText={t('Experience')}
        onSave={handleExperienceForm}
        onAdd={() => setIsSaved(true)}
        isSaveButtonEnabled={formState?.isValid}
      />
      <Optional
        condition={isSaved}
        fallback={
          <Optional
            condition={job.length > 0}
            fallback={<EmptyCard title={t('Where do you currently work?')} onAdd={() => setIsSaved(true)} />}
          >
            <FlatList
              data={jobs}
              contentContainerStyle={styles.listContainer}
              renderItem={({ item }: any) => renderItem(item)}
              keyExtractor={(item: any, index: number) => index.toString()}
            />
          </Optional>
        }
      >
        <ScrollView>
          <Card>
            <ExperienceForm setFormState={setFormState} skills={skills} organisations={organisations} />
          </Card>
        </ScrollView>
      </Optional>
    </ViewContainer>
  )
}

export default Experience
