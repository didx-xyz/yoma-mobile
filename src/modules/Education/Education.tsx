import { StackNavigationProp } from '@react-navigation/stack'
import { Card, InfoCard, NormalHeader, Optional, ViewContainer } from 'components'
import Spacer from 'components/Spacer'
import { FormikProps, FormikValues } from 'formik'
import { NavigationRoutes } from 'modules/Home/Home.routes'
import { HomeNavigatorParamsList } from 'modules/Home/Home.types'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, ScrollView } from 'react-native'

import { MOCKED_EDUCATION_DATA } from './Education.constants'
import styles from './Education.styles'
import { EductationEntry } from './Education.types'
import EducationForm from './EducationForm/EducationForm'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, NavigationRoutes.Education>
}

const Education = ({ navigation }: Props) => {
  const { t } = useTranslation()
  const [isSaved, setIsSaved] = useState(false)
  const [education, setEducation] = useState(MOCKED_EDUCATION_DATA)
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
          <FlatList
            data={education}
            ListHeaderComponent={<Spacer height={10} />}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={item => item.school}
          />
        }
      >
        <ScrollView>
          <Card>
            <EducationForm navigation={navigation} ref={formRef} />
          </Card>
        </ScrollView>
      </Optional>
    </ViewContainer>
  )
}

export default Education
