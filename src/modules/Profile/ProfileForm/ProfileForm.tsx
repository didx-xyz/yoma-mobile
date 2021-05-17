import { StackNavigationProp } from '@react-navigation/stack'
import api from 'api'
import { DropDown, Input, Spinner } from 'components'
import countries from 'constants/countries'
import { Formik, FormikProps, FormikValues } from 'formik'
import { USER_ID } from 'helpers/helpers'
import { NavigationRoutes } from 'modules/Home/Home.routes'
import { HomeNavigatorParamsList } from 'modules/Home/Home.types'
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { showSimpleMessage } from 'utils/error'
import { nameHasDigitsOrSymbols } from 'utils/regex'
import { mapToDropDownArray } from 'utils/strings.utils'
import * as yup from 'yup'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, NavigationRoutes.Profile>
}

const ProfileForm = forwardRef(({ navigation }: Props, ref) => {
  const { t } = useTranslation()
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    countryAlpha2: '',
    email: '',
    phoneNumber: '',
  })
  const formRef = useRef<FormikProps<FormikValues>>()
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  useImperativeHandle(ref, () => ({
    handleSubmit() {
      if (formRef.current) {
        formRef.current.handleSubmit()
      }
    },
  }))

  useEffect(() => {
    getUserData()
  }, [])

  const getUserData = async () => {
    await api.users
      .getById(USER_ID)
      .then(async response => {
        const userData = response.data
        const { firstName, lastName, email, countryAlpha2, phoneNumber } = userData
        setUser({ firstName, lastName, email, countryAlpha2, phoneNumber })
      })
      .catch(error => {
        console.log('error', error)
        showSimpleMessage('danger', 'Error', error)
      })
  }

  return (
    <Formik
      innerRef={formRef}
      initialValues={user}
      enableReinitialize
      validationSchema={yup.object().shape({
        firstName: yup
          .string()
          .min(2)
          .max(50)
          .required(t('required'))
          .test('First name', 'First name cannot include numbers or symbols', value => {
            return !nameHasDigitsOrSymbols(value!)
          })
          .label('First name'),
        lastName: yup
          .string()
          .min(2)
          .max(50)
          .required(t('required'))
          .test('Last name', 'Last name cannot include numbers or symbols', value => {
            return !nameHasDigitsOrSymbols(value!)
          })
          .label('Last name'),
        countryAlpha2: yup.string().required('Required').label('Country'),
        email: yup
          .string()
          .min(2, t('emailError'))
          .max(255)
          .email(t('validEmailError'))
          .required(t('required'))
          .label('Email'),
        phoneNumber: yup
          .string()
          .required(t('required'))
          .matches(phoneRegExp, 'Phone number is not valid')
          .min(10, 'too short')
          .max(13, 'too long'),
      })}
      onSubmit={async values => {
        try {
          await api.users.edit(USER_ID, values)
          navigation.navigate(NavigationRoutes.Home)
        } catch (error) {
          console.log('error', error)
        }
      }}
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
