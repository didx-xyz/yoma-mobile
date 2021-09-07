import { StackNavigationProp } from '@react-navigation/stack'
import { FormikProps, FormikValues } from 'formik'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native'

import Card from '../../components/Card'
import CvView, { CvViewCredentialTypes, CvViewList } from '../../components/CvView'
import CvViewCredential from '../../components/CvView/Credential'
import Header from '../../components/Header'
import Optional from '../../components/Optional'
import ViewContainer from '../../components/ViewContainer'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../HomeNavigation/HomeNavigation.types'
import { NORMALISED_EDUCATION_MOCK } from './Education.constants'
import styles from './Education.styles'
import EducationForm from './Form/EducationForm'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.Education>
  qualifications: CvViewCredentialTypes.CvViewCredentialsData
}

const Education = ({ navigation, qualifications = NORMALISED_EDUCATION_MOCK }: Props) => {
  const { t } = useTranslation()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaveButtonActive, setIsSaveButtonActive] = useState(false)
  const formRef = useRef<FormikProps<FormikValues>>()

  const toggleSaveButtonState = (hasFormChanged: boolean) => {
    setIsSaveButtonActive(hasFormChanged)
  }

  return (
    <Optional
      condition={isEditing}
      fallback={
        <CvView
          title={t('Education')}
          noDataMessage={t('Which school, university or college did you attend?')}
          onAdd={() => {
            setIsEditing(true)
          }}
          navigation={navigation}
        >
          <CvViewList data={qualifications} RenderItem={CvViewCredential} />
        </CvView>
      }
    >
      <ViewContainer style={styles.container}>
        <Header
          navigation={navigation}
          headerText={t('Education')}
          isSaveButtonEnabled={isSaveButtonActive}
          onSave={() => formRef.current?.handleSubmit()}
          showAddButton={false}
        />
        <ScrollView>
          <Card>
            <EducationForm ref={formRef} changeButtonState={toggleSaveButtonState} />
          </Card>
        </ScrollView>
      </ViewContainer>
    </Optional>
  )
}

export default Education
