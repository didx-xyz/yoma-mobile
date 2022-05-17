import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Formik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import { actions as UserSkillsActions } from '../../UserSkills'
import MySkillsForm from './MySkillsForm'
import { INITIAL_VALUES } from './MySkillsForm.constants'
import { UserSkillsField } from './MySkillsForm.types'
import { schema } from './MySkillsForm.validation'

interface Props {
  navigation: NativeStackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.MySkills>
}

const MySkillsFormContainer = ({ navigation }: Props) => {
  const dispatch = useDispatch()

  const handleSubmit = ({ skills }: UserSkillsField) => {
    dispatch(UserSkillsActions.addUserSkills(skills))
  }

  return (
    <Formik initialValues={INITIAL_VALUES} validationSchema={schema} onSubmit={handleSubmit}>
      {(formikHandlers: any) => <MySkillsForm navigation={navigation} form={formikHandlers} />}
    </Formik>
  )
}

export default MySkillsFormContainer
