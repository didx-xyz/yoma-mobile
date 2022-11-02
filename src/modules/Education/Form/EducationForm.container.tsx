import { Formik } from 'formik'
import { pipe } from 'ramda'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { actions as QualificationActions } from '~/modules/Qualifications'
import * as FormUtils from '~/utils/form.utils'

import { EducationNavigation } from '../types'
import EducationForm from './EducationForm'
import { INITIAL_FORM_VALUES } from './EducationForm.constants'
import selector from './EducationForm.selector'
import { FormFields } from './EducationForm.types'
import { schema } from './EducationForm.validation'

interface Props {
  navigation: EducationNavigation
}
const EducationFormContainer = ({ navigation }: Props) => {
  const { t } = useTranslation()
  const { organisations } = useSelector(selector)

  const dispatch = useDispatch()

  const handleSubmit = (values: FormFields) => {
    const education = pipe(FormUtils.sanitiseDateRange, FormUtils.countriesAsArray)(values)
    dispatch(QualificationActions.createQualification(education))
  }

  return (
    <Formik initialValues={INITIAL_FORM_VALUES} validationSchema={schema} onSubmit={handleSubmit}>
      {formikHandlers => (
        <EducationForm
          title={t('Education')}
          navigation={navigation}
          organisationsDropDown={organisations}
          form={formikHandlers}
        />
      )}
    </Formik>
  )
}

export default EducationFormContainer
