import countries from 'constants/countries'
import { Formik } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { mapToDropDownArray } from 'utils/strings.utils'

import DropDown from '../../components/DropDown'
import Input from '../../components/Input'
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

const ProfileForm = ({ user, setFormState }: Props) => {
  const { t } = useTranslation()

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
      {(formikHandlers: any) => {
        return (
          <>
            {/* <Spinner visible={formikHandlers.isSubmitting} /> */}
            <Input name={'firstName'} label={t('firstName')} handlers={formikHandlers} />
            <Input name={'lastName'} label={t('Surname')} handlers={formikHandlers} />
            <DropDown
              items={mapToDropDownArray(countries, 'code', 'name')}
              name={'countryAlpha2'}
              label={'Country'}
              searchPlaceholder={t('Search country')}
            />
            <Input
              name={'email'}
              label={t('email')}
              handlers={formikHandlers}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              name={'phoneNumber'}
              label={t('Cellphone')}
              handlers={formikHandlers}
              keyboardType="phone-pad"
              autoCapitalize="none"
            />
          </>
        )
      }}
    </Formik>
  )
}

export default ProfileForm
