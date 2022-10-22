import { Formik } from 'formik'
import React from 'react'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as UserActions from '~/modules/User/User.reducer'

import selector from '../About.selector'
import { AboutNavigation } from '../types'
import AboutForm from './AboutForm'
import { INITIAL_FORM_VALUES } from './AboutForm.constants'
import { schema } from './AboutForm.validation'
import { FormFields } from './types'

interface Props {
  navigation: AboutNavigation
}

const AboutFormContainer = ({ navigation }: Props) => {
  const dispatch = useDispatch()
  const values = useSelector(selector)

  const handleSubmit = useCallback(
    ({ biography }: FormFields) => {
      dispatch(UserActions.updateUser({ biography }))
    },
    [dispatch],
  )

  return (
    <Formik initialValues={values || INITIAL_FORM_VALUES} validationSchema={schema} onSubmit={handleSubmit}>
      {formikHandlers => <AboutForm navigation={navigation} form={formikHandlers} />}
    </Formik>
  )
}

export default AboutFormContainer
