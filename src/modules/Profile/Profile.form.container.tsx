import { Formik } from 'formik'
import React from 'react'

import ProfileForm from './Profile.form'
import { ProfileFormState } from './Profile.types'
import { profileValidationSchema } from './Profile.validationSchema'

interface Props {
  setFormState: ({ values: FormikValues, isValid: boolean }: ProfileFormState) => void
  user: {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string | null
    countryAlpha2: string
  }
}
const ProfileFormContainer = ({ user, setFormState }: Props) => {
  return (
    <Formik
      initialValues={user}
      enableReinitialize
      validate={values => {
        profileValidationSchema()
          .isValid(values)
          .then(isValid => {
            setFormState({ values, isValid })
          })
      }}
      validationSchema={profileValidationSchema}
      onSubmit={() => {}}
    >
      {(_formikHandlers: any) => <ProfileForm />}
    </Formik>
  )
}

export default ProfileFormContainer
