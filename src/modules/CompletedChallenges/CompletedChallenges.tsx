import { StackNavigationProp } from '@react-navigation/stack'
import { FormikProps, FormikValues } from 'formik'
import React, { useRef, useState } from 'react'

import { CvViewCredentialTypes } from '../../components/CvView'
import Optional from '../../components/Optional'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../HomeNavigation/HomeNavigation.types'
import { NORMALISED_CHALLENGES_MOCK } from './CompletedChallenges.constants'
import CompletedChallengesForm from './Form'
import CompletedChallengesView from './View'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.CompletedChallenges>
  challenges: CvViewCredentialTypes.CvViewCredentialsData
}

const CompletedChallenges = ({ navigation, challenges = NORMALISED_CHALLENGES_MOCK }: Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const formRef = useRef<FormikProps<FormikValues>>()

  return (
    <Optional
      condition={isEditing}
      fallback={
        <CompletedChallengesView onAdd={() => setIsEditing(true)} challenges={challenges} navigation={navigation} />
      }
    >
      <CompletedChallengesForm ref={formRef} navigation={navigation} />
    </Optional>
  )
}

export default CompletedChallenges
