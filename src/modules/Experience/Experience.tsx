import { StackNavigationProp } from '@react-navigation/stack'
import { evolve } from 'ramda'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, ScrollView } from 'react-native'

import Card from '../../components/Card'
import CredentialCard from '../../components/CredentialCard'
import { types as DropDownTypes } from '../../components/DropDown'
import EmptyCard from '../../components/EmptyCard'
import NormalHeader from '../../components/NormalHeader'
import Optional from '../../components/Optional'
import ViewContainer from '../../components/ViewContainer'
import { dateToISOString } from '../../utils/dates.utils'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../HomeNavigation/HomeNavigation.types'
import { types as UserJobsTypes } from '../UserJobs'
import styles from './Experience.styles'
import ExperienceForm from './Form/ExperienceForm'
import { INITIAL_VALUES } from './Form/ExperienceForm.constants'

interface Props {
  userJobs: UserJobsTypes.UserJobItem[]
  organisations: DropDownTypes.DropDownList[]
  skills: DropDownTypes.DropDownList[]
  onJobCreate: (job: any) => void
  onFilterSkills: (query: string) => void
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.Experience>
}

const Experience = ({ userJobs, organisations, skills, onJobCreate, onFilterSkills, navigation }: Props) => {
  const { t } = useTranslation()
  const [isSaved, setIsSaved] = useState(false)
  const [formState, setFormState] = useState<UserJobsTypes.UserJobsFormState>({ isValid: true, values: INITIAL_VALUES })

  const handleAddUserJob = useCallback(() => {
    setIsSaved(true)
  }, [])

  const handleUserJobsFormSave = () => {
    const values = evolve({
      startTime: dateToISOString,
      endTime: dateToISOString,
    })(formState.values)
    onJobCreate(values)
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
              renderItem={({ item }: any) => <CredentialCard {...item} />}
            />
          </Optional>
        }
      >
        <ScrollView>
          <Card>
            <ExperienceForm
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

export default Experience
