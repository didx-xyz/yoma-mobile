import { StackNavigationProp } from '@react-navigation/stack'
import { EmptyCard, Card, InfoCard, NormalHeader, Optional, ViewContainer } from 'components'
import { FormikProps, FormikValues } from 'formik'
import { HomeNavigationRoutes } from 'modules/Home/Home.routes'
import { HomeNavigatorParamsList } from 'modules/Home/Home.types'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, ScrollView } from 'react-native'

import { MOCKED_EDUCATION_DATA } from './Education.constants'
import styles from './Education.styles'
import { EductationEntry } from './Education.types'
import EducationForm from './EducationForm/EducationForm'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.Education>
}

const Education = ({ navigation }: Props) => {
  const { t } = useTranslation()
  const [isSaved, setIsSaved] = useState(false)
  const formRef = useRef<FormikProps<FormikValues>>()

  const renderItem = ({
    description,
    startDate,
    endDate,
    organisationLogoURL,
    qualification,
    school,
  }: EductationEntry) => {
    return (
      <InfoCard
        title={school}
        subtitle={qualification}
        description={description}
        startDate={startDate}
        endDate={endDate}
        logo={organisationLogoURL}
      />
    )
  }

  return (
    <ViewContainer style={styles.container}>
      <NormalHeader
        navigation={navigation}
        headerText={t('Education')}
        onSave={() => formRef.current?.handleSubmit()}
        onAdd={() => {
          setIsSaved(true)
        }}
        showAddButton={!isSaved}
      />
      <Optional
        condition={isSaved}
        fallback={
          <Optional
            condition={MOCKED_EDUCATION_DATA.length > 0}
            fallback={
              <EmptyCard
                title={t('Which school, university or college did you attend?')}
                onAdd={() => setIsSaved(true)}
              />
            }
          >
            <FlatList
              data={MOCKED_EDUCATION_DATA}
              contentContainerStyle={styles.listContainer}
              renderItem={({ item }) => renderItem(item)}
              keyExtractor={item => item.school}
            />
          </Optional>
        }
      >
        <ScrollView>
          <Card>
            <EducationForm ref={formRef} />
          </Card>
        </ScrollView>
      </Optional>
    </ViewContainer>
  )
}

export default Education
