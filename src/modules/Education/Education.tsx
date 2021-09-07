import { StackNavigationProp } from '@react-navigation/stack'
import { FormikProps, FormikValues } from 'formik'
import React, { useRef, useState } from 'react'

import Optional from '../../components/Optional'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../HomeNavigation/HomeNavigation.types'
import EducationForm from './Form'
import EducationView from './View'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.Education>
}

const Education = ({ navigation }: Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const formRef = useRef<FormikProps<FormikValues>>()

  return (
    <Optional
      condition={isEditing}
      fallback={
        <EducationView
          navigation={navigation}
          onAdd={() => {
            setIsEditing(true)
          }}
        />
      }
    >
      <EducationForm ref={formRef} navigation={navigation} />
    </Optional>
  )
}

export default Education
