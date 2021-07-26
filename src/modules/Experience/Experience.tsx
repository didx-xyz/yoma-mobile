import { StackNavigationProp } from '@react-navigation/stack'
import { Card, EmptyCard, InfoCard, Optional } from 'components'
import NormalHeader from 'components/NormalHeader/NormalHeader'
import ViewContainer from 'components/ViewContainer/ViewContainer'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from 'modules/HomeNavigation/HomeNavigation.types'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, ScrollView } from 'react-native'

import styles from './Experience.styles'
import { ExperienceFormState, ExperienceType, QualificationRequestPayload } from './Experience.types'
import ExperienceForm from './ExperienceForm/ExperienceForm'
import { DropDownList } from './ExperienceForm/ExperienceForm.types'

interface Props {
  onExperienceSave: (qualification: any) => void
  qualifications: QualificationRequestPayload[]
  organisations: [DropDownList]
  skills: [DropDownList]
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

const Experience = ({ navigation, onExperienceSave, qualifications, organisations, skills }: Props) => {
  const { t } = useTranslation()
  const [isSaved, setIsSaved] = useState(false)
  const [qualification, setQualification] = useState([])
  const [formState, setFormState] = useState<ExperienceFormState>(null)

  useEffect(() => {
    setQualification(qualification)
  }, [qualification])

  const handleExperienceForm = () => {
    if (formState?.isValid) {
      onExperienceSave(formState.values)
    }
  }
  return (
    <ViewContainer style={styles.container}>
      <NormalHeader
        navigation={navigation}
        headerText={t('Experience')}
        onSave={handleExperienceForm}
        onAdd={() => setIsSaved(true)}
        showAddButton={!isSaved}
      />
      <Optional
        condition={isSaved}
        fallback={
          <Optional
            condition={qualification.length > 0}
            fallback={<EmptyCard title={t('Where do you currently work?')} onAdd={() => setIsSaved(true)} />}
          >
            <FlatList
              data={qualifications}
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
