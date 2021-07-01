import { StackNavigationProp } from '@react-navigation/stack'
import { DropDown, Input, Spinner } from 'components'
import countries from 'constants/countries'
import { Formik, FormikProps, FormikValues } from 'formik'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { mapToDropDownArray } from 'utils/strings.utils'

import { types as HomeNavigationTypes } from '../HomeNavigation'
import { profileValidationSchema } from './Profile.validationSchema'

interface Props {
  navigation: StackNavigationProp<
    HomeNavigationTypes.HomeNavigatorParamsList,
    HomeNavigationTypes.HomeNavigationRoutes.Profile
  >
  user: {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string | null
    countryAlpha2: string
  }
}

const ProfileForm = forwardRef(({ user }: Props, ref) => {
  const { t } = useTranslation()
  const formRef = useRef<FormikProps<FormikValues>>(null)

  useImperativeHandle(ref, () => ({
    handleSubmit() {
      if (formRef.current) {
        formRef.current.handleSubmit()
      }
    },
  }))

  return (
    <Formik
      innerRef={formRef}
      initialValues={user}
      enableReinitialize
      validationSchema={profileValidationSchema}
      onSubmit={() => {}}
    >
      {formikHandlers => {
        return (
          <>
            <Spinner visible={formikHandlers.isSubmitting} />
            <Input name={'firstName'} label={t('firstName')} handlers={formikHandlers} />
            <Input name={'lastName'} label={t('Surname')} handlers={formikHandlers} />
            <DropDown
              items={mapToDropDownArray(countries, 'code', 'name')}
              name={'countryAlpha2'}
              label={'Country'}
              handlers={formikHandlers}
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
})

export default ProfileForm
