import { StackNavigationProp } from '@react-navigation/stack'
import { FormikProps, FormikValues } from 'formik'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native'

import Card from '../../components/Card'
import CvView, { CvViewCredential, CvViewCredentialTypes, CvViewList } from '../../components/CvView'
import Header from '../../components/Header'
import Optional from '../../components/Optional'
import ViewContainer from '../../components/ViewContainer'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../HomeNavigation/HomeNavigation.types'
import { NORMALISED_CHALLENGES_MOCK } from './CompletedChallenges.constants'
import CompletedChallengesForm from './CompletedChallenges.form'
import styles from './CompletedChallenges.styles'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.CompletedChallenges>
  challenges: CvViewCredentialTypes.CvViewCredentialsData
}

const CompletedChallenges = ({ navigation, challenges = NORMALISED_CHALLENGES_MOCK }: Props) => {
  const { t } = useTranslation()
  const [isEditing, setIsEditing] = useState(false)
  const formRef = useRef<FormikProps<FormikValues>>()

  return (
    <Optional
      condition={isEditing}
      fallback={
        <CvView
          title={t('Challenges')}
          noDataMessage={t('Have you completed any challenges yet?')}
          onAdd={() => setIsEditing(true)}
          navigation={navigation}
        >
          <CvViewList data={challenges} RenderItem={CvViewCredential} />
        </CvView>
      }
    >
      <ViewContainer style={styles.container}>
        <Header
          navigation={navigation}
          onSave={formRef.current?.handleSubmit}
          headerText={t('Add challenge')}
          showAddButton={false}
        />
        <ScrollView>
          <Card>
            <CompletedChallengesForm ref={formRef} />
          </Card>
        </ScrollView>
      </ViewContainer>
    </Optional>
  )
}

export default CompletedChallenges
