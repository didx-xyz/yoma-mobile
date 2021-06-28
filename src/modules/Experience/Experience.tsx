import { StackNavigationProp } from '@react-navigation/stack'
import { EmptyCard, Card, InfoCard, Optional } from 'components'
import NormalHeader from 'components/NormalHeader/NormalHeader'
import ViewContainer from 'components/ViewContainer/ViewContainer'
import { FormikProps, FormikValues } from 'formik'
import { HomeNavigationRoutes } from 'modules/Home/Home.routes'
import { HomeNavigatorParamsList } from 'modules/Home/Home.types'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, ScrollView } from 'react-native'

import styles from './Experience.styles'
import { ExperienceType } from './Experience.types'
import ExperienceForm from './ExperienceForm/ExperienceForm'

interface Props {
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

const Experience = ({ navigation }: Props) => {
  const { t } = useTranslation()
  const [isSaved, setIsSaved] = useState(false)
  const [experience] = useState([])
  const formRef = useRef<FormikProps<FormikValues>>()

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
            condition={experience.length > 0}
            fallback={<EmptyCard title={t('Where do you currently work?')} onAdd={() => setIsSaved(true)} />}
          >
            <FlatList
              data={experience}
              contentContainerStyle={styles.listContainer}
              renderItem={({ item }) => renderItem(item)}
              keyExtractor={(item, index) => index.toString()}
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
