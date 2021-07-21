import { StackNavigationProp } from '@react-navigation/stack'
import { Card, EmptyCard, InfoCard, Optional } from 'components'
import NormalHeader from 'components/NormalHeader/NormalHeader'
import ViewContainer from 'components/ViewContainer/ViewContainer'
import { FormikProps, FormikValues } from 'formik'
import { Qualification } from 'modules/Credentials/Credentials.types'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from 'modules/HomeNavigation/HomeNavigation.types'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, ScrollView } from 'react-native'

import styles from './Experience.styles'
import { ExperienceType } from './Experience.types'
import ExperienceForm from './ExperienceForm/ExperienceForm'

interface Props {
  qualifications: Qualification[]
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

const Experience = ({ navigation, qualifications }: Props) => {
  const { t } = useTranslation()
  const [isSaved, setIsSaved] = useState(false)
  const [qualification, setQualification] = useState(qualifications)
  const formRef = useRef<FormikProps<FormikValues>>()

  useEffect(() => {
    setQualification(qualification)
  }, [qualification])

  return (
    <ViewContainer style={styles.container}>
      <NormalHeader
        navigation={navigation}
        headerText={t('Experience')}
        onSave={formRef.current?.handleSubmit}
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
              data={[]}
              contentContainerStyle={styles.listContainer}
              renderItem={({ item }: any) => renderItem(item)}
              keyExtractor={(item: any, index: number) => index.toString()}
            />
          </Optional>
        }
      >
        <ScrollView>
          <Card>
            <ExperienceForm navigation={navigation} ref={formRef} />
          </Card>
        </ScrollView>
      </Optional>
    </ViewContainer>
  )
}

export default Experience
