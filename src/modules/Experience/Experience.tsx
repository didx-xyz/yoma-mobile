import { StackNavigationProp } from '@react-navigation/stack'
import { evolve } from 'ramda'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native'

import Card from '../../components/Card'
import CvView, { CvViewCredentialTypes, CvViewList } from '../../components/CvView'
import CvViewCredential from '../../components/CvView/Credential'
import { types as DropDownTypes } from '../../components/DropDown'
import Header from '../../components/Header'
import Optional from '../../components/Optional'
import ViewContainer from '../../components/ViewContainer'
import { dateToISOString } from '../../utils/dates.utils'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../HomeNavigation/HomeNavigation.types'
import { types as UserJobsTypes } from '../UserJobs'
import styles from './Experience.styles'
import ExperienceForm from './Form/ExperienceForm'
import { INITIAL_VALUES } from './Form/ExperienceForm.constants'

interface Props {
  userJobs: CvViewCredentialTypes.CvViewCredentialsData
  organisations: DropDownTypes.DropDownList[]
  skills: DropDownTypes.DropDownList[]
  onJobCreate: (job: any) => void
  onFilterSkills: (query: string) => void
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.Experience>
}

const Experience = ({ userJobs, organisations, skills, onJobCreate, onFilterSkills, navigation }: Props) => {
  const { t } = useTranslation()
  const [isEditing, setIsEditing] = useState(false)
  const [formState, setFormState] = useState<UserJobsTypes.UserJobsFormState>({ isValid: true, values: INITIAL_VALUES })

  const handleAddUserJob = () => {
    setIsEditing(true)
  }

  const handleUserJobsFormSave = () => {
    const values = evolve({
      startTime: dateToISOString,
      endTime: dateToISOString,
    })(formState.values)
    onJobCreate(values)
  }

  return (
    <Optional
      condition={isEditing}
      fallback={
        <CvView
          title={t('Experience')}
          noDataMessage={t('Where do you currently work?')}
          onAdd={handleAddUserJob}
          navigation={navigation}
        >
          <CvViewList data={userJobs} RenderItem={CvViewCredential} />
        </CvView>
      }
    >
      <ViewContainer style={styles.container}>
        <Header
          navigation={navigation}
          headerText={t('Experience')}
          onSave={handleUserJobsFormSave}
          showAddButton={false}
          isSaveButtonEnabled={formState?.isValid}
        />
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
      </ViewContainer>
    </Optional>
  )
}

export default Experience
